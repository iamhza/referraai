
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  ClipboardCheck,
  Ban,
  ArrowUpRight,
  Sliders,
  Sparkles,
  FileBarChart
} from 'lucide-react';

const ProviderDashboard = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="text-gray-500">Manage your referrals and service listings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Sliders className="h-4 w-4 mr-2" />
              Service Settings
            </Button>
            <Button className="bg-referra-500 hover:bg-referra-600">
              <FileBarChart className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: "New Referrals", 
              value: "12", 
              description: "Pending your review",
              icon: <Clock className="h-5 w-5 text-amber-500" />,
              color: "bg-amber-50"
            },
            { 
              title: "Active Clients", 
              value: "36", 
              description: "Currently receiving services",
              icon: <Users className="h-5 w-5 text-blue-500" />,
              color: "bg-blue-50"
            },
            { 
              title: "Completed", 
              value: "82", 
              description: "Services completed",
              icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
              color: "bg-green-50"
            },
            { 
              title: "Availability", 
              value: "High", 
              description: "Current capacity status",
              icon: <Sparkles className="h-5 w-5 text-purple-500" />,
              color: "bg-purple-50"
            }
          ].map((metric, index) => (
            <Card key={index} className="border">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full ${metric.color} flex items-center justify-center mb-4`}>
                  {metric.icon}
                </div>
                <h2 className="text-2xl font-bold">{metric.value}</h2>
                <p className="font-medium text-gray-900">{metric.title}</p>
                <p className="text-sm text-gray-500">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Referrals & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Pending Referrals</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/provider/referrals" className="flex items-center gap-1 text-referra-600">
                    View all <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardDescription>New service requests requiring your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "REF-4851",
                    service: "Mental Health Counseling",
                    urgency: "High",
                    timeframe: "Immediate",
                    status: "New Match",
                    caseManager: "Michael Johnson"
                  },
                  {
                    id: "REF-4849",
                    service: "Substance Use Treatment",
                    urgency: "Medium",
                    timeframe: "Within 2 weeks",
                    status: "Pending Review",
                    caseManager: "Sarah Williams"
                  },
                  {
                    id: "REF-4847",
                    service: "Mental Health Counseling",
                    urgency: "Low",
                    timeframe: "Flexible",
                    status: "Pending Review",
                    caseManager: "David Thompson"
                  }
                ].map((referral, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-referra-200 transition-colors">
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
                          <Badge variant="outline">{referral.status}</Badge>
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
                        <Button variant="outline" size="sm">
                          <Ban className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                        <Button size="sm" className="bg-referra-500 hover:bg-referra-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>How your services are performing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    service: "Mental Health Counseling",
                    matches: 68,
                    acceptRate: 85,
                    trend: "up"
                  },
                  {
                    service: "Substance Use Treatment",
                    matches: 42,
                    acceptRate: 76,
                    trend: "up"
                  },
                  {
                    service: "Peer Support Services",
                    matches: 31,
                    acceptRate: 64,
                    trend: "down"
                  }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.service}</h3>
                      <span className={`flex items-center text-sm ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend === 'up' ? '+' : '-'}12%
                        <ArrowUpRight className={`h-3.5 w-3.5 ml-0.5 ${
                          item.trend === 'down' && 'rotate-180'
                        }`} />
                      </span>
                    </div>
                    <Progress value={item.acceptRate} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{item.matches} matches this month</span>
                      <span>{item.acceptRate}% acceptance rate</span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Active Clients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Clients</CardTitle>
                <CardDescription>Clients currently receiving your services</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/provider/clients">
                  View All Clients
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Referral ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Case Manager</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Start Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "REF-4832",
                      service: "Mental Health Counseling",
                      caseManager: "Michael Johnson",
                      startDate: "Apr 10, 2025",
                      status: "In Progress",
                      daysActive: 3
                    },
                    {
                      id: "REF-4821",
                      service: "Substance Use Treatment",
                      caseManager: "Sarah Williams",
                      startDate: "Apr 5, 2025",
                      status: "In Progress",
                      daysActive: 8
                    },
                    {
                      id: "REF-4814",
                      service: "Mental Health Counseling",
                      caseManager: "David Thompson",
                      startDate: "Apr 1, 2025",
                      status: "In Progress",
                      daysActive: 12
                    }
                  ].map((client, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{client.id}</td>
                      <td className="px-4 py-3 text-sm">{client.service}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="bg-blue-100 text-blue-800 h-full w-full flex items-center justify-center text-xs font-medium">
                              {client.caseManager.split(' ').map(n => n[0]).join('')}
                            </div>
                          </Avatar>
                          <span>{client.caseManager}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{client.startDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className="bg-blue-100 text-blue-800">
                          {client.status}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {client.daysActive} days active
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/provider/referral-tracker/${client.id}`}>
                            <ClipboardCheck className="h-4 w-4 mr-1" />
                            Update
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
