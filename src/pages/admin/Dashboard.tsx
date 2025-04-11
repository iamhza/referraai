
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ClipboardList, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Activity,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Demo data for the admin dashboard
  const stats = [
    {
      title: "Active Referrals",
      value: "87",
      icon: <ClipboardList className="h-8 w-8 text-blue-500" />,
      change: "+12% from last month",
      trend: "up"
    },
    {
      title: "Pending Matches",
      value: "34",
      icon: <Clock className="h-8 w-8 text-amber-500" />,
      change: "+5 new today",
      trend: "up"
    },
    {
      title: "Registered Users",
      value: "218",
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: "+3 in the last week",
      trend: "up"
    },
    {
      title: "Success Rate",
      value: "76%",
      icon: <CheckCircle className="h-8 w-8 text-indigo-500" />,
      change: "+2% improvement",
      trend: "up"
    }
  ];

  // Data for urgent referrals that need matching
  const urgentReferrals = [
    { id: 4829, service: "Adult rehabilitative mental health services", urgency: "high", waitTime: "2 days", county: "Hennepin" },
    { id: 4831, service: "Housing stabilization services", urgency: "high", waitTime: "1 day", county: "Ramsey" },
    { id: 4835, service: "Substance use disorder treatment", urgency: "high", waitTime: "3 days", county: "Dakota" },
  ];

  // Data for recent users
  const recentUsers = [
    { id: 101, name: "Sarah Johnson", role: "Case Manager", agency: "Hennepin County", joinDate: "Apr 10, 2025" },
    { id: 102, name: "Michael Rivera", role: "Provider", organization: "Wellness Center", joinDate: "Apr 9, 2025" },
    { id: 103, name: "Aisha Patel", role: "Case Manager", agency: "Ramsey County", joinDate: "Apr 8, 2025" },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Monitor and manage the Referra platform</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      {stat.trend === "up" ? 
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" /> : 
                        <TrendingUp className="h-3 w-3 text-red-500 mr-1 transform rotate-180" />
                      }
                      {stat.change}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Urgent Referrals */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-gray-900">Urgent Referrals</CardTitle>
                <Link to="/admin/referrals">
                  <Button variant="ghost" size="sm" className="text-referra-600 hover:text-referra-700 -mr-2">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Needs matching with providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <Link to={`/admin/referral-matching/${referral.id}`}>
                          <span className="font-medium text-gray-900 hover:text-referra-600">#{referral.id}</span>
                        </Link>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">{referral.service}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span className="mr-2">County: {referral.county}</span>
                        <span>Waiting: {referral.waitTime}</span>
                      </div>
                    </div>
                    <Link to={`/admin/referral-matching/${referral.id}`}>
                      <Button size="sm" className="bg-referra-500 hover:bg-referra-600">Match Now</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-gray-900">Recent Users</CardTitle>
                <Link to="/admin/users">
                  <Button variant="ghost" size="sm" className="text-referra-600 hover:text-referra-700 -mr-2">
                    Manage Users <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>New users who joined recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Users className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{user.role}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span className="mr-2">{user.agency || user.organization}</span>
                        <span>Joined: {user.joinDate}</span>
                      </div>
                    </div>
                    <Link to={`/admin/users`}>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health & Matching Stats */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Referral Matching Performance</CardTitle>
              <CardDescription>Speed and quality of matches over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Time to First Match</span>
                    <span className="text-sm font-medium text-green-600">1.2 days</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">40% faster than target</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Provider Acceptance Rate</span>
                    <span className="text-sm font-medium text-amber-600">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">7% below target</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Client Satisfaction</span>
                    <span className="text-sm font-medium text-green-600">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">12% above average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
