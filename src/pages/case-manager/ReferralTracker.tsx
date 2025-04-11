
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  MessageCircle, 
  FileText,
  Clipboard,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MessagePanel, MessageButton } from '@/components/messages/MessagePanel';
import ReferralCommunicationPanel from '@/components/referrals/ReferralCommunicationPanel';

const ReferralTracker = () => {
  const { referralId } = useParams<{ referralId: string }>();
  const [showMessages, setShowMessages] = useState(false);
  
  const referral = {
    id: referralId || '123',
    client: 'John Smith',
    status: 'in_progress',
    serviceType: 'Mental Health Services',
    urgency: 'high',
    createdAt: '2025-04-10',
    matchedAt: '2025-04-11',
    startedAt: '2025-04-12',
    estimatedCompletionDate: '2025-05-12',
    progressPercentage: 40,
    provider: {
      name: 'Minnesota Care Center',
      contact: 'Dr. Sarah Williams',
      email: 'swilliams@mcc.example.com',
      phone: '(612) 555-1234'
    },
    caseManager: {
      name: 'Michael Johnson',
      email: 'mjohnson@agency.example.com',
      phone: '(651) 555-7890'
    },
    nextMilestone: {
      title: 'Initial Assessment',
      date: '2025-04-15',
      status: 'upcoming'
    },
    recentActivity: [
      {
        type: 'message',
        description: 'Provider sent a message',
        timestamp: '2025-04-13 14:30',
        actor: 'provider'
      },
      {
        type: 'milestone',
        description: 'Intake paperwork completed',
        timestamp: '2025-04-12 10:15',
        actor: 'case_manager'
      },
      {
        type: 'status_change',
        description: 'Referral status changed to In Progress',
        timestamp: '2025-04-12 09:00',
        actor: 'system'
      },
      {
        type: 'match',
        description: 'Referral matched with Minnesota Care Center',
        timestamp: '2025-04-11 15:45',
        actor: 'case_manager'
      }
    ]
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'matched':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-4 w-4" />;
      case 'milestone':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'status_change':
        return <Clock className="h-4 w-4" />;
      case 'match':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const getActorColor = (actor: string) => {
    switch (actor) {
      case 'provider':
        return 'bg-referra-100 text-referra-800';
      case 'case_manager':
        return 'bg-teal-100 text-teal-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-6">
            <Button variant="ghost" size="sm" className="w-fit" asChild>
              <Link to="/case-manager/referrals" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to referrals
              </Link>
            </Button>
            
            <div className="bg-white rounded-xl p-6 shadow border-l-4 border-referra-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Referral #{referral.id}</h1>
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status === 'in_progress' ? 'In Progress' : referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {referral.serviceType} • Created on {referral.createdAt}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowMessages(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Provider
                  </Button>
                  <Button className="bg-referra-500 hover:bg-referra-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Service Progress</CardTitle>
              <CardDescription>
                Tracking the progress of this referral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Progress: {referral.progressPercentage}%</span>
                  <span>Started: {referral.startedAt}</span>
                </div>
                <Progress value={referral.progressPercentage} className="h-2" />
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Estimated completion: {referral.estimatedCompletionDate}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Next Milestone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{referral.nextMilestone.title}</h3>
                        <p className="text-sm text-gray-500">Due: {referral.nextMilestone.date}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        Upcoming
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Provider</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <div className="bg-referra-100 text-referra-700 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                          {referral.provider.name.charAt(0)}
                        </div>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{referral.provider.name}</h3>
                        <p className="text-sm text-gray-500">Contact: {referral.provider.contact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Case Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <div className="bg-teal-100 text-teal-700 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                          {referral.caseManager.name.charAt(0)}
                        </div>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{referral.caseManager.name}</h3>
                        <p className="text-sm text-gray-500">{referral.caseManager.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="communication">
            <TabsList className="mb-4">
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="communication" className="space-y-6">
              <ReferralCommunicationPanel referralId={referral.id} />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>Recent activity for this referral</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {referral.recentActivity.map((activity, index) => (
                      <div key={index} className="relative pl-6 pb-6">
                        {index < referral.recentActivity.length - 1 && (
                          <div className="absolute top-0 left-2.5 bottom-0 w-px bg-gray-200"></div>
                        )}
                        
                        <div className={`absolute top-0 left-0 w-5 h-5 rounded-full flex items-center justify-center ${getActorColor(activity.actor)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        
                        <div className="ml-4">
                          <div className="font-medium">{activity.description}</div>
                          <div className="text-sm text-gray-500">{activity.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Documents & Forms</CardTitle>
                  <CardDescription>Upload and manage documents for this referral</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Clipboard className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No documents yet</h3>
                    <p className="text-gray-500 mt-1">Upload documents to share with the provider or client</p>
                    <Button className="mt-4 bg-referra-500 hover:bg-referra-600">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <MessageButton showMessages={showMessages} setShowMessages={setShowMessages} unreadCount={2} />
      <MessagePanel showMessages={showMessages} setShowMessages={setShowMessages} />
    </DashboardLayout>
  );
};

export default ReferralTracker;
