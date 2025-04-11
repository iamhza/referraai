
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  path?: string;
}

const ReferralMetrics = () => {
  const metrics = [
    {
      title: "Active Referrals",
      value: "24",
      description: "Currently in progress",
      icon: <Zap className="h-5 w-5 text-referra-500" />,
      accentColor: "border-referra-500 bg-referra-50",
      path: "/active-referrals"
    },
    {
      title: "Completed This Month",
      value: "42",
      description: "186 all-time completed",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      accentColor: "border-green-500 bg-green-50",
      path: "/completed-referrals"
    },
    {
      title: "Avg. Completion Time",
      value: "4.2 days",
      description: "↓ 0.8 days from last month",
      icon: <Clock className="h-5 w-5 text-gray-500" />,
      accentColor: "border-gray-400 bg-gray-50"
    }
  ];
  
  return (
    <Card className="border-none shadow-md bg-white overflow-hidden">
      <CardHeader className="pb-2 pt-6">
        <h2 className="text-xl font-semibold text-gray-900">Referral Statistics</h2>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
              accentColor={metric.accentColor}
              path={metric.path}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  accentColor,
  path 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };
  
  return (
    <div 
      className={`flex items-center p-4 rounded-lg border-l-4 ${accentColor} ${path ? 'cursor-pointer' : ''} hover:shadow-md transition-shadow`}
      onClick={path ? handleClick : undefined}
    >
      <div className="p-3 rounded-full bg-white mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

export default ReferralMetrics;
