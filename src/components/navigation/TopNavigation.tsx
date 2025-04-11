
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ArrowRight, MessageSquare, Bell, Settings } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TopNavigationProps {
  setShowMessages: (value: boolean) => void;
  unreadCount: number;
}

export const TopNavigation = ({ setShowMessages, unreadCount }: TopNavigationProps) => {
  const location = useLocation();
  
  const menuItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Referrals", path: "/referrals", icon: ArrowRight },
    { title: "Clients", path: "/clients", icon: Users },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex items-center gap-2 mr-8">
              <div className="bg-referra-500 text-white p-1.5 rounded">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Referra</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                    location.pathname === item.path
                      ? "bg-gray-100 text-referra-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-referra-500"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowMessages(true)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <MessageSquare className="h-5 w-5 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <div className="border-l h-6 mx-2"></div>
            <div className="flex items-center gap-3">
              <Avatar>
                <div className="bg-referra-200 text-referra-800 w-8 h-8 rounded-full flex items-center justify-center">
                  CM
                </div>
              </Avatar>
              <div className="hidden xl:block">
                <div className="font-medium text-sm">Case Manager</div>
                <div className="text-xs text-muted-foreground">manager@agency.org</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
