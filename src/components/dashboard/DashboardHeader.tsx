
import React from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  // Get user name from context or state in a real app
  const userName = "Casey";
  
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}</h1>
            <p className="text-gray-600 mt-1">What would you like to do today?</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              <span>Notifications</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </Button>
            
            <Button 
              className="bg-referra-500 hover:bg-referra-600 text-white shadow-sm" 
              size="lg"
              asChild
            >
              <Link to="/new-referral">
                New Referral Request
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
