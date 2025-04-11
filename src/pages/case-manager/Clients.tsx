
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  ArrowRight, 
  User, 
  Users, 
  Circle, 
  Clock
} from 'lucide-react';

// Mock data for clients
const clientsData = [
  {
    id: 1,
    name: "John Smith",
    openReferrals: 2,
    status: "active",
    lastReferral: "Mental Health Services (Apr 11, 2025)",
    lastActive: "Today"
  },
  {
    id: 2,
    name: "Maria Johnson",
    openReferrals: 1,
    status: "active",
    lastReferral: "Substance Use Treatment (Apr 10, 2025)",
    lastActive: "Yesterday"
  },
  {
    id: 3,
    name: "Robert Davis",
    openReferrals: 1,
    status: "active",
    lastReferral: "Housing Support (Apr 8, 2025)",
    lastActive: "2 days ago"
  },
  {
    id: 4,
    name: "Sarah Williams",
    openReferrals: 0,
    status: "inactive",
    lastReferral: "Mental Health Services (Mar 15, 2025)",
    lastActive: "2 weeks ago"
  },
  {
    id: 5,
    name: "James Wilson",
    openReferrals: 0,
    status: "inactive",
    lastReferral: "Employment Services (Mar 5, 2025)",
    lastActive: "1 month ago"
  }
];

const Clients = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-500">Manage your client information</p>
          </div>
          
          <div className="flex gap-2">
            <Button className="bg-referra-500 hover:bg-referra-600">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>All Clients</CardTitle>
                    <CardDescription>
                      Showing {clientsData.length} clients
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search clients..."
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Open Referrals</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Referral</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Last Active</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsData.map((client) => (
                        <tr key={client.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <div className="bg-referra-100 text-referra-800 w-8 h-8 rounded-full flex items-center justify-center font-medium">
                                  {client.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              </Avatar>
                              <span className="font-medium">{client.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Badge className={client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              <Circle className={`h-2 w-2 mr-1 ${client.status === 'active' ? 'text-green-600' : 'text-gray-600'}`} />
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <Badge className={client.openReferrals > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                              {client.openReferrals}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm">{client.lastReferral}</td>
                          <td className="px-4 py-4 text-sm hidden md:table-cell">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-gray-400" />
                              {client.lastActive}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Button variant="ghost" size="sm" className="text-gray-500">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">
                  Showing {clientsData.length} of {clientsData.length} clients
                </p>
                <Button variant="outline" size="sm" disabled>
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:w-1/4">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Users className="h-4 w-4 mr-2 text-referra-500" />
                    Client Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Clients</span>
                      <span className="font-medium">{clientsData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Active Clients</span>
                      <span className="font-medium">{clientsData.filter(c => c.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Inactive Clients</span>
                      <span className="font-medium">{clientsData.filter(c => c.status === 'inactive').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Open Referrals</span>
                      <span className="font-medium">{clientsData.reduce((sum, client) => sum + client.openReferrals, 0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <User className="h-4 w-4 mr-2 text-referra-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Create Referral
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
