
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ClipboardList,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
  FileText,
  Users,
  Bell,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

// Type for the navigation items
type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  role: 'case_manager' | 'provider' | 'both';
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  // Determine if the user is on a provider route or case manager route
  const isProviderRoute = location.pathname.startsWith('/provider');
  const userRole = isProviderRoute ? 'provider' : 'case_manager';

  // Navigation items based on role
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: userRole === 'provider' ? '/provider' : '/case-manager',
      icon: <LayoutDashboard className="h-5 w-5" />,
      role: 'both'
    },
    {
      title: 'Referrals',
      href: userRole === 'provider' ? '/provider/referrals' : '/case-manager/referrals',
      icon: <ClipboardList className="h-5 w-5" />,
      role: 'both'
    },
    {
      title: 'New Referral',
      href: '/case-manager/new-referral',
      icon: <FileText className="h-5 w-5" />,
      role: 'case_manager'
    },
    {
      title: 'Providers',
      href: '/case-manager/providers',
      icon: <Users className="h-5 w-5" />,
      role: 'case_manager'
    },
    {
      title: 'Messages',
      href: userRole === 'provider' ? '/provider/messages' : '/case-manager/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      role: 'both'
    },
    {
      title: 'Settings',
      href: userRole === 'provider' ? '/provider/settings' : '/case-manager/settings',
      icon: <Settings className="h-5 w-5" />,
      role: 'both'
    }
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    item => item.role === 'both' || item.role === userRole
  );

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Close sidebar if screen size changes to larger than mobile
  React.useEffect(() => {
    if (!isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 w-64 fixed h-full z-20 top-0 left-0 lg:left-0 transition-transform duration-300 ease-in-out",
          isSmallScreen && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
          !isSmallScreen ? "block" : "hidden",
          sidebarOpen ? "block" : ""
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
            </Link>
            {isSmallScreen && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center py-2 px-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
                  location.pathname === item.href && "bg-referra-50 text-referra-700"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t mt-auto">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/avatars/user.png" />
                <AvatarFallback className="bg-referra-100 text-referra-700">
                  {userRole === 'provider' ? 'P' : 'CM'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email || (userRole === 'provider' ? 'Provider User' : 'Case Manager')}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userRole === 'provider' ? 'Service Provider' : 'Case Management'}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-700"
                asChild
              >
                <Link to={userRole === 'provider' ? '/provider/settings' : '/case-manager/settings'}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-700"
                onClick={handleSignOut}
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
                <Link to="/" className="flex items-center space-x-2">
                  <Logo className="h-8 w-auto" />
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
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8 lg:hidden">
                <AvatarImage src="/avatars/user.png" />
                <AvatarFallback className="bg-referra-100 text-referra-700">
                  {userRole === 'provider' ? 'P' : 'CM'}
                </AvatarFallback>
              </Avatar>
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

export default DashboardLayout;
