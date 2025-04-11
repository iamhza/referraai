
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Calendar, CheckCircle2, Tag, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReferralCardProps {
  id: string;
  service: string;
  urgency: 'high' | 'medium' | 'low';
  timeInStage: string;
  stage: 'pending' | 'matched' | 'active' | 'completed';
  providersCount?: number;
  referenceCode?: string;
  createdDate?: string;
  category?: string;
  onClick?: () => void;
}

const OpenReferrals = () => {
  const navigate = useNavigate();
  
  const referrals: ReferralCardProps[] = [
    {
      id: '1',
      service: 'Adult rehabilitative mental health services (ARMHS)',
      urgency: 'high',
      timeInStage: '2 days',
      stage: 'matched',
      providersCount: 4,
      referenceCode: 'MH-2025-A',
      createdDate: 'Apr 9, 2025',
      category: 'Mental Health'
    },
    {
      id: '2',
      service: 'Housing stabilization services (HSS)',
      urgency: 'medium',
      timeInStage: '1 day',
      stage: 'pending',
      referenceCode: 'HS-2025-B',
      createdDate: 'Apr 10, 2025',
      category: 'Housing'
    },
    {
      id: '3',
      service: 'Opioid treatment – non-residential',
      urgency: 'high',
      timeInStage: '3 days',
      stage: 'matched',
      providersCount: 3,
      referenceCode: 'SA-2025-C',
      createdDate: 'Apr 7, 2025',
      category: 'Substance Use'
    },
    {
      id: '4',
      service: 'Family training',
      urgency: 'low',
      timeInStage: '5 days',
      stage: 'active',
      referenceCode: 'FT-2025-D',
      createdDate: 'Apr 5, 2025',
      category: 'Family Services'
    }
  ];
  
  const handleViewAll = () => {
    navigate('/referrals');
  };
  
  const filteredReferrals = referrals.filter(ref => ref.stage !== 'completed');
  
  return (
    <Card className="border-none shadow-md bg-white overflow-hidden">
      <CardHeader className="pb-4 pt-5 flex flex-row justify-between items-center border-b">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">Open Referrals</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Recent referrals requiring attention</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleViewAll} className="text-referra-600 hover:text-referra-800">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReferrals.map((referral) => (
            <ReferralCard 
              key={referral.id}
              {...referral}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ReferralCard: React.FC<ReferralCardProps> = ({ 
  id, 
  service, 
  urgency, 
  timeInStage, 
  stage,
  providersCount,
  referenceCode,
  createdDate,
  category,
  onClick 
}) => {
  const navigate = useNavigate();
  
  const urgencyColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  const stageLabels = {
    pending: 'Pending Match',
    matched: 'Provider Selection',
    active: 'In Progress',
    completed: 'Completed'
  };

  const stageIcons = {
    pending: <Clock className="h-4 w-4 mr-2" />,
    matched: <CheckCircle2 className="h-4 w-4 mr-2" />,
    active: <Calendar className="h-4 w-4 mr-2" />,
    completed: <CheckCircle2 className="h-4 w-4 mr-2" />
  };
  
  const categoryColors = {
    'Mental Health': 'bg-purple-100 text-purple-800',
    'Housing': 'bg-green-100 text-green-800',
    'Substance Use': 'bg-blue-100 text-blue-800',
    'Family Services': 'bg-orange-100 text-orange-800'
  };
  
  const handleAction = () => {
    if (stage === 'matched') {
      navigate(`/matched-providers/${id}`);
    } else if (stage === 'active') {
      navigate(`/referral-tracker/${id}`);
    } else if (stage === 'pending') {
      navigate(`/referral-tracker/${id}`);
    }
  };
  
  return (
    <div className="border rounded-lg p-5 hover:shadow-md transition-all duration-200 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-medium text-gray-900">#{id}</h3>
            {referenceCode && (
              <Badge variant="outline" className="text-xs font-normal">
                <Tag className="h-3 w-3 mr-1" />
                {referenceCode}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{service}</p>
        </div>
        <Badge className={`ml-2 ${urgencyColors[urgency]}`}>
          {urgency === 'high' && <Flame className="h-3 w-3 mr-1" />}
          {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
        </Badge>
      </div>
      
      <div className="flex flex-col gap-2 text-sm text-gray-600 mb-3">
        {category && (
          <div className="flex items-start mb-1">
            <Badge className={`${categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'} mr-1`}>
              <FileText className="h-3 w-3 mr-1" />
              {category}
            </Badge>
          </div>
        )}
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span>In stage for {timeInStage}</span>
        </div>
        
        {createdDate && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Created on {createdDate}</span>
          </div>
        )}
        
        {stage === 'matched' && providersCount && (
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2 text-gray-400" />
            <span>{providersCount} providers matched</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center text-sm font-medium">
          {stageIcons[stage]}
          <span className="text-referra-600">{stageLabels[stage]}</span>
        </div>
        
        <Button 
          size="sm"
          onClick={handleAction}
          className={stage === 'matched' ? 'bg-referra-500 hover:bg-referra-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
        >
          {stage === 'matched' && "Select Provider"}
          {stage === 'active' && "Track Progress"}
          {stage === 'pending' && "View Details"}
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default OpenReferrals;
