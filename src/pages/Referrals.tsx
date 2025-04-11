
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, Flame, Users, CheckCircle, FileText } from 'lucide-react';

const Referrals = () => {
  const navigate = useNavigate();

  // Demo data for referrals
  const referralsData = [
    {
      id: '1001',
      clientName: 'Maria Johnson',
      service: 'Mental Health Services',
      urgency: 'high',
      stage: 'selected',
      timeInStage: '2 days',
      providersCount: 0,
      providerName: 'Minnesota Care Center'
    },
    {
      id: '1002',
      clientName: 'James Rodriguez',
      service: 'Housing Assistance',
      urgency: 'medium',
      stage: 'matched',
      timeInStage: '1 day',
      providersCount: 4,
      providerName: null
    },
    {
      id: '1003',
      clientName: 'Sarah Thompson',
      service: 'Substance Abuse Treatment',
      urgency: 'high',
      stage: 'pending',
      timeInStage: '3 days',
      providersCount: 0,
      providerName: null
    },
    {
      id: '1004',
      clientName: 'Michael Chen',
      service: 'Family Therapy',
      urgency: 'low',
      stage: 'in-progress',
      timeInStage: '5 days',
      providersCount: 0,
      providerName: 'Family First Counseling'
    },
    {
      id: '1005',
      clientName: 'Emily Davis',
      service: 'Food Assistance',
      urgency: 'medium',
      stage: 'completed',
      timeInStage: '10 days',
      providersCount: 0,
      providerName: 'Community Food Bank'
    }
  ];

  const urgencyColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-blue-100 text-blue-800'
  };
  
  const stageLabels = {
    pending: 'Pending Match',
    matched: 'Provider Selection',
    selected: 'Provider Selected',
    'in-progress': 'In Progress',
    completed: 'Completed'
  };

  const stageIcons = {
    pending: Clock,
    matched: Users,
    selected: CheckCircle,
    'in-progress': FileText,
    completed: CheckCircle
  };

  const handleReferralClick = (referralId: string, stage: string) => {
    if (stage === 'matched') {
      navigate(`/matched-providers/${referralId}`);
    } else if (stage === 'selected' || stage === 'in-progress') {
      navigate(`/referral-tracker/${referralId}`);
    } else if (stage === 'pending') {
      // In a real app, this might go to a different view
      navigate(`/referral-tracker/${referralId}`);
    } else if (stage === 'completed') {
      navigate(`/referral-tracker/${referralId}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
            <Button 
              className="bg-referra-500 hover:bg-referra-600"
              onClick={() => navigate('/new-referral')}
            >
              New Referral
            </Button>
          </div>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-0">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All Referrals</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="matched">Matched</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralsData.map((referral) => {
                    const StageIcon = stageIcons[referral.stage as keyof typeof stageIcons];
                    return (
                      <TableRow 
                        key={referral.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleReferralClick(referral.id, referral.stage)}
                      >
                        <TableCell className="font-medium">{referral.clientName}</TableCell>
                        <TableCell>{referral.service}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StageIcon className="h-4 w-4 text-gray-500" />
                            <span>{stageLabels[referral.stage as keyof typeof stageLabels]}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={urgencyColors[referral.urgency as keyof typeof urgencyColors]}>
                            {referral.urgency === 'high' && <Flame className="h-3 w-3 mr-1" />}
                            {referral.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {referral.providerName ? (
                            referral.providerName
                          ) : (
                            referral.stage === 'matched' ? (
                              <span className="text-sm text-gray-500">{referral.providersCount} providers matched</span>
                            ) : (
                              <span className="text-sm text-gray-500">-</span>
                            )
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReferralClick(referral.id, referral.stage);
                            }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
