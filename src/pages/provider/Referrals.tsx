
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  X, 
  AlertTriangle,
  Calendar,
  Users,
  Filter,
  ArrowDownAZ,
  Ban
} from 'lucide-react';

// Sample data for referrals
const referralsData = {
  pending: [
    {
      id: "REF-4851",
      service: "Mental Health Counseling",
      urgency: "High",
      timeframe: "Immediate",
      status: "New Match",
      caseManager: "Michael Johnson",
      date: "Apr 11, 2025"
    },
    {
      id: "REF-4849",
      service: "Substance Use Treatment",
      urgency: "Medium",
      timeframe: "Within 2 weeks",
      status: "Pending Review",
      caseManager: "Sarah Williams",
      date: "Apr 10, 2025"
    },
    {
      id: "REF-4847",
      service: "Mental Health Counseling",
      urgency: "Low",
      timeframe: "Flexible",
      status: "Pending Review",
      caseManager: "David Thompson",
      date: "Apr 9, 2025"
    }
  ],
  active: [
    {
      id: "REF-4832",
      service: "Mental Health Counseling",
      urgency: "Medium",
      timeframe: "Started Apr 10, 2025",
      status: "In Progress",
      caseManager: "Michael Johnson",
      progress: 25
    },
    {
      id: "REF-4821",
      service: "Substance Use Treatment",
      urgency: "High",
      timeframe: "Started Apr 5, 2025",
      status: "In Progress",
      caseManager: "Sarah Williams",
      progress: 50
    },
    {
      id: "REF-4814",
      service: "Mental Health Counseling",
      urgency: "Medium",
      timeframe: "Started Apr 1, 2025",
      status: "In Progress",
      caseManager: "David Thompson",
      progress: 75
    }
  ],
  completed: [
    {
      id: "REF-4789",
      service: "Mental Health Counseling",
      urgency: "Medium",
      timeframe: "Apr 1 - Mar 30, 2025",
      status: "Completed",
      caseManager: "Michael Johnson"
    },
    {
      id: "REF-4745",
      service: "Substance Use Treatment",
      urgency: "High",
      timeframe: "Mar 15 - Mar 28, 2025",
      status: "Completed",
      caseManager: "Sarah Williams"
    }
  ],
  declined: [
    {
      id: "REF-4812",
      service: "Family Therapy",
      urgency: "Low",
      timeframe: "Declined on Apr 3, 2025",
      status: "Declined",
      caseManager: "David Thompson",
      reason: "Service not currently available"
    }
  ]
};

const ProviderReferrals = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to render referral item based on status
  const renderReferralItem = (referral: any, status: string) => (
    <div className="p-4 border rounded-lg hover:border-referra-200 transition-colors mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{referral.id}</h3>
            <Badge className={referral.urgency === 'High' 
              ? 'bg-red-100 text-red-800' 
              : referral.urgency === 'Medium'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-green-100 text-green-800'
            }>
              {referral.urgency} Urgency
            </Badge>
            {status === 'pending' && (
              <Badge variant="outline">{referral.status}</Badge>
            )}
          </div>
          <p className="text-gray-800">{referral.service}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {referral.timeframe}
            </span>
            <span className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              From: {referral.caseManager}
            </span>
          </div>
        </div>
        <div className="flex gap-2 self-end lg:self-center mt-2 lg:mt-0">
          {status === 'pending' && (
            <>
              <Button variant="outline" size="sm">
                <Ban className="h-4 w-4 mr-1" />
                Decline
              </Button>
              <Button size="sm" className="bg-referra-500 hover:bg-referra-600">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Accept
              </Button>
            </>
          )}
          
          {status === 'active' && (
            <Button size="sm" asChild>
              <Link to={`/provider/referral-tracker/${referral.id}`}>
                View Progress
              </Link>
            </Button>
          )}
          
          {status === 'completed' && (
            <Button size="sm" variant="outline">
              View Summary
            </Button>
          )}
          
          {status === 'declined' && (
            <Button size="sm" variant="outline">
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
            <p className="text-gray-500">Manage all your service referrals</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search referrals..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <ArrowDownAZ className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Pending ({referralsData.pending.length})</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Active ({referralsData.active.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed ({referralsData.completed.length})</span>
            </TabsTrigger>
            <TabsTrigger value="declined" className="flex items-center gap-2">
              <X className="h-4 w-4" />
              <span>Declined ({referralsData.declined.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Pending Referrals</CardTitle>
                <CardDescription>New referrals requiring your review and action</CardDescription>
              </CardHeader>
              <CardContent>
                {referralsData.pending.length > 0 ? (
                  referralsData.pending.map((referral, index) => (
                    renderReferralItem(referral, 'pending')
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No pending referrals</h3>
                    <p className="text-gray-500 mt-1">You don't have any pending referrals at the moment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Active Referrals</CardTitle>
                <CardDescription>Currently active service referrals</CardDescription>
              </CardHeader>
              <CardContent>
                {referralsData.active.length > 0 ? (
                  referralsData.active.map((referral, index) => (
                    renderReferralItem(referral, 'active')
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No active referrals</h3>
                    <p className="text-gray-500 mt-1">You don't have any active referrals at the moment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Completed Referrals</CardTitle>
                <CardDescription>Services that have been successfully completed</CardDescription>
              </CardHeader>
              <CardContent>
                {referralsData.completed.length > 0 ? (
                  referralsData.completed.map((referral, index) => (
                    renderReferralItem(referral, 'completed')
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No completed referrals</h3>
                    <p className="text-gray-500 mt-1">You don't have any completed referrals yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="declined" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Declined Referrals</CardTitle>
                <CardDescription>Referrals you were unable to accept</CardDescription>
              </CardHeader>
              <CardContent>
                {referralsData.declined.length > 0 ? (
                  referralsData.declined.map((referral, index) => (
                    renderReferralItem(referral, 'declined')
                  ))
                ) : (
                  <div className="text-center py-12">
                    <X className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No declined referrals</h3>
                    <p className="text-gray-500 mt-1">You don't have any declined referrals</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProviderReferrals;
