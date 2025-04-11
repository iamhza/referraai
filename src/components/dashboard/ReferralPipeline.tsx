
import React from 'react';
import { Clock, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface StageCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick?: () => void;
}

const ReferralPipeline = () => {
  const stages = [
    {
      title: "Pending Matches",
      count: 8,
      icon: <Clock className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-800 border-amber-300",
      description: "Waiting for admin to match"
    },
    {
      title: "Matched",
      count: 12,
      icon: <ArrowRight className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800 border-blue-300",
      description: "Select a provider"
    },
    {
      title: "Active",
      count: 24,
      icon: <ArrowRight className="h-5 w-5" />,
      color: "bg-green-100 text-green-800 border-green-300",
      description: "Service in progress"
    },
    {
      title: "Urgent",
      count: 5,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-red-100 text-red-800 border-red-300",
      description: "Needs immediate attention"
    },
    {
      title: "Completed",
      count: 42,
      icon: <Check className="h-5 w-5" />,
      color: "bg-gray-100 text-gray-800 border-gray-300",
      description: "Service completed"
    }
  ];
  
  return (
    <Card className="border-none shadow-sm bg-white mb-6">
      <CardHeader className="pb-0 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Referral Pipeline</h2>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stages.map((stage, index) => (
            <StageCard 
              key={index}
              title={stage.title}
              count={stage.count}
              icon={stage.icon}
              color={stage.color}
              description={stage.description}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const StageCard: React.FC<StageCardProps> = ({ 
  title, 
  count, 
  icon, 
  color,
  description,
  onClick 
}) => {
  return (
    <div 
      className={`${color} rounded-lg p-4 border cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 rounded-full bg-white">
          {icon}
        </div>
        <span className="text-2xl font-bold">{count}</span>
      </div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ReferralPipeline;
