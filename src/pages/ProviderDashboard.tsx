
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Home, Settings, MessageSquare, FileText, Check, X,
  Clock, AlertTriangle, Calendar, User, MapPin, CalendarCheck,
  ChevronRight, Menu, Bell, LogOut
} from 'lucide-react';

interface ReferralRequest {
  id: string;
  clientName: string;
  service: string;
  urgency: 'high' | 'medium' | 'low';
  referredDate: string;
  insurance: string;
  caseManager: string;
  county: string;
  selected?: boolean;
}

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('new-referrals');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const newReferrals: ReferralRequest[] = [
    {
      id: '101',
      clientName: 'Maria Johnson',
      service: 'Mental Health Therapy',
      urgency: 'high',
      referredDate: '2023-09-15',
      insurance: 'Medicaid',
      caseManager: 'Casey (County Agency)',
      county: 'Hennepin',
      selected: true
    },
    {
      id: '102',
      clientName: 'David Smith',
      service: 'Substance Use Treatment',
      urgency: 'medium',
      referredDate: '2023-09-14',
      insurance: 'Blue Cross',
      caseManager: 'Jameson (Health System)',
      county: 'Ramsey'
    },
    {
      id: '103',
      clientName: 'Sophia Williams',
      service: 'Family Therapy',
      urgency: 'low',
      referredDate: '2023-09-13',
      insurance: 'HealthPartners',
      caseManager: 'Taylor (School District)',
      county: 'Dakota'
    }
  ];
  
  const activeReferrals: ReferralRequest[] = [
    {
      id: '95',
      clientName: 'James Rodriguez',
      service: 'Individual Therapy',
      urgency: 'medium',
      referredDate: '2023-09-10',
      insurance: 'UCare',
      caseManager: 'Morgan (County Agency)',
      county: 'Anoka'
    },
    {
      id: '87',
      clientName: 'Emily Jackson',
      service: 'Group Therapy',
      urgency: 'low',
      referredDate: '2023-09-05',
      insurance: 'Medicaid',
      caseManager: 'Riley (Community Center)',
      county: 'Hennepin'
    }
  ];

  const handleAcceptReferral = (referralId: string) => {
    toast({
      title: "Referral Accepted",
      description: "You've accepted this referral. Please contact the case manager to proceed.",
    });
  };

  const handleDeclineReferral = (referralId: string) => {
    toast({
      title: "Referral Declined",
      description: "You've declined this referral. Please provide a reason.",
    });
  };
  
  const handleViewDetails = (referralId: string) => {
    navigate(`/referral-tracker/${referralId}`);
  };

  const urgencyColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mr-8">
                <div className="bg-indigo-500 text-white p-1.5 rounded">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
                <span className="text-xl font-semibold">Referra</span>
                <Badge className="ml-1 bg-gray-100 text-gray-800">Provider</Badge>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <Link
                  to="/provider"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-indigo-600 flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/provider/active"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Active Cases
                </Link>
                <Link
                  to="/provider/messages"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Link>
                <Link
                  to="/provider/settings"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-500" />
              </button>
              <div className="border-l h-6 mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-200 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center">
                  MCC
                </div>
                <div className="hidden xl:block">
                  <div className="font-medium text-sm">Minnesota Care Center</div>
                  <div className="text-xs text-gray-500">provider@mcc.org</div>
                </div>
              </div>
              
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/provider"
                className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-indigo-600 flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/provider/active"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Active Cases
              </Link>
              <Link
                to="/provider/messages"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Link>
              <Link
                to="/provider/settings"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <Link
                to="/landing"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-500 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                  <p className="text-gray-600 mt-1">Minnesota Care Center</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 py-1 px-2">
                    Active Provider
                  </Badge>
                  <Button variant="outline" className="gap-2" asChild>
                    <Link to="/provider/settings">
                      <Settings className="h-4 w-4" />
                      Manage Profile
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">New Referrals</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    3
                    <Badge className="bg-red-100 text-red-800 text-xs">1 urgent</Badge>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Active Clients</div>
                  <div className="text-2xl font-bold">24</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Today's Appointments</div>
                  <div className="text-2xl font-bold">5</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Messages</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    7
                    <Badge className="bg-blue-100 text-blue-800 text-xs">2 new</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Next Actions */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-6 pb-3">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </CardHeader>
            <CardContent className="p-6 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-indigo-500 hover:bg-indigo-600 h-auto py-3 justify-start">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">View Schedule</div>
                    <div className="text-xs text-indigo-200">5 appointments today</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start">
                  <User className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Client Records</div>
                    <div className="text-xs text-gray-500">Access case files</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Messages</div>
                    <div className="text-xs text-gray-500">2 unread messages</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Referral Tabs */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <Tabs defaultValue="new-referrals" onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="ml-4 mt-4">
                  <TabsTrigger value="new-referrals" className="rounded-t-lg">New Referrals</TabsTrigger>
                  <TabsTrigger value="active-cases" className="rounded-t-lg">Active Cases</TabsTrigger>
                  <TabsTrigger value="upcoming" className="rounded-t-lg">Upcoming Appointments</TabsTrigger>
                </TabsList>
              </div>
              
              {/* New Referrals Tab */}
              <TabsContent value="new-referrals" className="p-0 m-0">
                <CardContent className="p-6">
                  {newReferrals.length > 0 ? (
                    <div className="space-y-4">
                      {newReferrals.map((referral) => (
                        <div key={referral.id} className={`border rounded-lg overflow-hidden ${referral.selected ? 'border-indigo-300 bg-indigo-50' : ''}`}>
                          <div className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{referral.clientName}</h3>
                                  <Badge className={urgencyColors[referral.urgency]}>
                                    {referral.urgency === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                    {referral.urgency.charAt(0).toUpperCase() + referral.urgency.slice(1)}
                                  </Badge>
                                  {referral.selected && (
                                    <Badge className="bg-indigo-100 text-indigo-800">
                                      Selected Provider
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{referral.service}</p>
                              </div>
                              <div className="mt-2 sm:mt-0 text-sm text-gray-500 flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                Referred: {referral.referredDate}
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Insurance:</span> {referral.insurance}
                              </div>
                              <div>
                                <span className="text-gray-500">Case Manager:</span> {referral.caseManager}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{referral.county} County</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button 
                                size="sm" 
                                className="gap-1 bg-indigo-500 hover:bg-indigo-600"
                                onClick={() => handleAcceptReferral(referral.id)}
                              >
                                <Check className="h-4 w-4" />
                                Accept Referral
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="gap-1 border-red-200 text-red-700 hover:bg-red-50"
                                onClick={() => handleDeclineReferral(referral.id)}
                              >
                                <X className="h-4 w-4" />
                                Decline
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="gap-1"
                                onClick={() => handleViewDetails(referral.id)}
                              >
                                View Details
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {referral.selected && (
                            <div className="bg-indigo-100 p-3 border-t border-indigo-200">
                              <div className="flex items-center text-indigo-800 text-sm">
                                <CalendarCheck className="h-4 w-4 mr-2" />
                                Case Manager is waiting for you to schedule an initial assessment.
                                <Button size="sm" variant="link" className="ml-2 p-0 h-auto text-indigo-600">
                                  Send available times
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-3">
                        <Calendar className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No New Referrals</h3>
                      <p className="text-gray-500 mt-1 max-w-md mx-auto">
                        You don't have any new referrals at the moment. New referrals will appear here when they're matched to your services.
                      </p>
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              
              {/* Active Cases Tab */}
              <TabsContent value="active-cases" className="p-0 m-0">
                <CardContent className="p-6">
                  {activeReferrals.length > 0 ? (
                    <div className="space-y-4">
                      {activeReferrals.map((referral) => (
                        <div key={referral.id} className="border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{referral.clientName}</h3>
                                <Badge className="bg-green-100 text-green-800">
                                  Active
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{referral.service}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Started: {referral.referredDate}
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Insurance:</span> {referral.insurance}
                            </div>
                            <div>
                              <span className="text-gray-500">Case Manager:</span> {referral.caseManager}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              <span>{referral.county} County</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              className="gap-1 bg-indigo-500 hover:bg-indigo-600"
                              onClick={() => handleViewDetails(referral.id)}
                            >
                              View Case Details
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <MessageSquare className="h-4 w-4" />
                              Message Case Manager
                            </Button>
                            <Button size="sm" variant="ghost" className="gap-1">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-3">
                        <FileText className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No Active Cases</h3>
                      <p className="text-gray-500 mt-1 max-w-md mx-auto">
                        You don't have any active cases right now. When you accept referrals, they'll appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              
              {/* Upcoming Appointments Tab */}
              <TabsContent value="upcoming" className="p-0 m-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">Initial Assessment - Maria Johnson</h3>
                            <p className="text-sm text-gray-600">Thursday, Sep 21, 2023 • 2:00 PM - 3:00 PM</p>
                          </div>
                        </div>
                        <Badge className="bg-indigo-100 text-indigo-800">
                          Upcoming
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="gap-1 bg-indigo-500 hover:bg-indigo-600">
                          Start Session
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">Follow-up - James Rodriguez</h3>
                            <p className="text-sm text-gray-600">Friday, Sep 22, 2023 • 10:00 AM - 11:00 AM</p>
                          </div>
                        </div>
                        <Badge className="bg-indigo-100 text-indigo-800">
                          Upcoming
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="gap-1 bg-indigo-500 hover:bg-indigo-600">
                          Start Session
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
