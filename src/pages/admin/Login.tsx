
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Lock, Shield } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, isAdmin } = useAuth();

  // Check if user is already logged in as admin
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Use the same signIn function from AuthContext
      await signIn(email, password);
      
      // Authentication state will be updated by AuthContext
      // Navigation will happen in useEffect when isAdmin becomes true
    } catch (error: any) {
      setError(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <Logo className="h-8 w-auto" />
            <span className="text-xl font-semibold">Referra Admin</span>
          </div>
        </div>
        
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-10 w-10 text-referra-600" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
            <CardDescription className="text-center">
              Restricted area. Authorized personnel only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-referra-600 hover:bg-referra-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Lock className="mr-2 h-4 w-4 animate-pulse" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Access Admin Dashboard
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
