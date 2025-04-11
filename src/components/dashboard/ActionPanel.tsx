
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ActionPanel = () => {
  return (
    <Card className="border-none shadow-md bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="bg-referra-500 hover:bg-referra-600 text-white flex-grow h-12 text-base font-medium shadow-sm" 
            asChild
          >
            <Link to="/new-referral" className="flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              <span>Create New Referral</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-referra-200 text-referra-700 hover:bg-referra-50 flex-grow h-12 text-base font-medium" 
            asChild
          >
            <Link to="/pending-matches" className="flex items-center justify-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Review Pending Matches</span>
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <StatusCard 
            label="Active Referrals" 
            value="24" 
            bgColor="bg-blue-50" 
            textColor="text-blue-700" 
          />
          <StatusCard 
            label="Pending Matches" 
            value="8" 
            bgColor="bg-amber-50" 
            textColor="text-amber-700" 
          />
          <StatusCard 
            label="Needs Attention" 
            value="5" 
            bgColor="bg-red-50" 
            textColor="text-red-700" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatusCardProps {
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

const StatusCard = ({ label, value, bgColor, textColor }: StatusCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-2xl font-bold ${textColor} mt-1`}>{value}</p>
    </div>
  );
};

export default ActionPanel;
