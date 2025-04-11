import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
  Users,
  ShieldAlert,
  Activity,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');
  const { toast } = useToast();
  const { user, isAdmin, signOut } = useAuth();

  // Check if user is authenticated as admin
  useEffect(() => {
    if (!user || !isAdmin) {
      toast({
        title: "Authentication required",
        description: "Please login to access the admin dashboard",
        variant: "destructive"
      });
      navigate('/admin/login');
    }
  }, [user, isAdmin, navigate, toast]);

  // Navigation items
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Referral Management',
      href: '/admin/referrals',
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: 'User Management',
      href: '/admin/users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'System Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard",
    });
  };

  // Close sidebar if screen size changes to larger than mobile
  React.useEffect(() => {
    if (!isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [isSmallScreen]);

  // Get admin username or email
  const getAdminDisplayName = () => {
    if (!user) return 'Admin';
    
    // Try to get the display name from user profile if exists
    const userEmail = user.email || '';
    const emailUsername = userEmail.split('@')[0];
    return emailUsername || 'Admin';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "bg-gray-900 text-white w-64 fixed h-full z-20 top-0 left-0 lg:left-0 transition-transform duration-300 ease-in-out",
          isSmallScreen && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
          !isSmallScreen ? "block" : "hidden",
          sidebarOpen ? "block" : ""
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto text-white" />
              <span className="font-bold text-lg">Referra Admin</span>
            </Link>
            {isSmallScreen && (
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md hover:bg-gray-800 transition-colors",
                  location.pathname === item.href && "bg-referra-600 text-white"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800 mt-auto">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-referra-700 text-white">
                  {getAdminDisplayName().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {getAdminDisplayName()}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  Administrator
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && isSmallScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        !isSmallScreen ? "ml-64" : "ml-0"
      )}>
        {/* Top navigation bar */}
        <header className="bg-white border-b h-16 flex items-center px-4 sticky top-0 z-10">
          <div className="flex-1 flex items-center justify-between w-full">
            <div className="flex items-center">
              {isSmallScreen && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="lg:hidden">
                <Link to="/admin" className="flex items-center space-x-2">
                  <Logo className="h-8 w-auto" />
                  <span className="font-bold">Admin</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex items-center">
                <ShieldAlert className="mr-2 h-4 w-4 text-referra-600" />
                Admin Mode
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="bg-gray-50 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
