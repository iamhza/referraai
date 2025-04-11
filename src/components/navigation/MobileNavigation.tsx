
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ArrowRight, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar } from '@/components/ui/avatar';

interface MobileNavigationProps {
  menuItems: Array<{
    title: string;
    path: string;
    icon: React.ElementType;
  }>;
}

export const MobileNavigation = ({ menuItems }: MobileNavigationProps) => {
  const location = useLocation();
  
  return (
    <div className="md:hidden flex justify-end px-4 py-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <List className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4 mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-gray-100 text-referra-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-referra-500"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 px-2 py-4 border-t">
              <Avatar>
                <div className="bg-referra-200 text-referra-800 w-10 h-10 rounded-full flex items-center justify-center">
                  CM
                </div>
              </Avatar>
              <div>
                <div className="font-medium">Case Manager</div>
                <div className="text-xs text-muted-foreground">manager@agency.org</div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
