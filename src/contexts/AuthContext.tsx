
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isCaseManager: boolean;
  isProvider: boolean;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // This flag helps prevent fetching profiles on the public landing page
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  
  useEffect(() => {
    // Check if the current route is an authenticated route
    const currentPath = window.location.pathname;
    const publicRoutes = ['/', '/signin', '/signup', '/admin/login'];
    setIsAuthRoute(!publicRoutes.includes(currentPath));
  }, []);

  useEffect(() => {
    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          setUserRole(null);
          setUserProfile(null);
        } else if (session?.user && isAuthRoute) {
          // Only fetch profile on authenticated routes
          // Defer profile fetching to avoid Supabase deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && isAuthRoute) {
        // Only fetch profile on authenticated routes
        fetchUserProfile(session.user.id);
      } else {
        // If no session or on public route, set loading to false without fetching profile
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuthRoute]);

  async function fetchUserProfile(userId: string) {
    try {
      // Only attempt to fetch profile if user is authenticated
      if (!userId || !isAuthRoute) {
        setLoading(false);
        return;
      }
      
      console.log('Fetching user profile for:', userId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        // Fall back to metadata
        if (user?.user_metadata) {
          const fallbackProfile = {
            id: userId,
            full_name: user.user_metadata.full_name || user.email?.split('@')[0],
            role: user.user_metadata.role || 'case_manager'
          };
          console.log('Using fallback profile from metadata:', fallbackProfile);
          setUserRole(fallbackProfile.role);
          setUserProfile(fallbackProfile);
        }
        setLoading(false);
        return;
      }

      if (data) {
        console.log('User profile loaded successfully:', data);
        setUserRole(data.role);
        setUserProfile(data);
      } else {
        console.log('No profile found for user ID:', userId);
        // Fall back to metadata
        if (user?.user_metadata) {
          const fallbackProfile = {
            id: userId,
            full_name: user.user_metadata.full_name || user.email?.split('@')[0],
            role: user.user_metadata.role || 'case_manager'
          };
          console.log('Using fallback profile from metadata:', fallbackProfile);
          setUserRole(fallbackProfile.role);
          setUserProfile(fallbackProfile);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        toast({
          title: 'Signed in successfully',
          description: `Welcome back, ${data.user.email}!`,
        });
        
        if (data.user.id) {
          await fetchUserProfile(data.user.id);
        }
        
        // Short delay to allow profile to load
        setTimeout(() => {
          if (userRole === 'admin') {
            navigate('/admin');
          } else if (userRole === 'provider') {
            navigate('/provider');
          } else {
            navigate('/case-manager');
          }
        }, 500);
      }
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName,
            role: userData?.role || 'case_manager',
          },
        },
      });

      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        toast({
          title: 'Account created',
          description: 'Please check your email to confirm your account',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: 'Sign out failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Signed out successfully',
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const isAdmin = userRole === 'admin';
  const isCaseManager = userRole === 'case_manager';
  const isProvider = userRole === 'provider';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isCaseManager,
        isProvider,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
