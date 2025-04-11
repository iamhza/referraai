
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, AlertTriangle, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  path?: string;
}

const PriorityMetrics = () => {
  const navigate = useNavigate();
  
  const metrics = [
    {
      title: "Urgent Referrals",
      value: "5",
      description: "Needs immediate attention",
      icon: <Flame className="h-5 w-5 text-red-500" />,
      accentColor: "border-red-500 bg-red-50",
      path: "/urgent-referrals"
    },
    {
      title: "Pending Matches",
      value: "8",
      description: "Awaiting provider selection",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      accentColor: "border-amber-500 bg-amber-50",
      path: "/pending-matches"
    },
    {
      title: "Clients Awaiting Intake",
      value: "17",
      description: "Needs processing",
      icon: <UserPlus className="h-5 w-5 text-referra-500" />,
      accentColor: "border-referra-500 bg-referra-50",
      path: "/clients/intake"
    }
  ];
  
  return (
    <Card className="border-none shadow-md bg-white overflow-hidden">
      <CardHeader className="pb-2 pt-6">
        <h2 className="text-xl font-semibold text-gray-900">Priority Actions</h2>
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
      className={`flex items-center p-4 rounded-lg border-l-4 ${accentColor} hover:shadow-md transition-shadow cursor-pointer`}
      onClick={handleClick}
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

export default PriorityMetrics;
