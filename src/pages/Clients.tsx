import React, { useState } from 'react';
import { Search, FileText, Filter } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

// Mock data for referrals
const referralsData = [
  {
    id: 1,
    serviceType: "Mental Health Services",
    status: "active",
    dateCreated: "Apr 11, 2025",
    lastUpdated: "Today"
  },
  {
    id: 2,
    serviceType: "Substance Use Treatment",
    status: "active",
    dateCreated: "Apr 10, 2025",
    lastUpdated: "Yesterday"
  },
  {
    id: 3,
    serviceType: "Housing Support",
    status: "active",
    dateCreated: "Apr 8, 2025",
    lastUpdated: "2 days ago"
  },
  {
    id: 4,
    serviceType: "Mental Health Services",
    status: "inactive",
    dateCreated: "Mar 15, 2025",
    lastUpdated: "2 weeks ago"
  },
  {
    id: 5,
    serviceType: "Employment Services",
    status: "inactive",
    dateCreated: "Mar 5, 2025",
    lastUpdated: "1 month ago"
  }
];

const ReferralList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
              <p className="text-gray-500 mt-1">Track and manage your referrals</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="text-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-referra-500 hover:bg-referra-600">
                <FileText className="h-4 w-4 mr-2" />
                Create Referral
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-9 w-full" 
                placeholder="Search by referral ID, service type..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4">
              <Button variant="outline" size="sm">Status</Button>
              <Button variant="outline" size="sm">Date Range</Button>
              <Button variant="outline" size="sm">Service Type</Button>
            </div>
          </div>

          {/* Tabs and content */}
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Referrals</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle>All Referrals</CardTitle>
                  <CardDescription>Showing {referralsData.length} referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Created</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Last Updated</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {referralsData.map((referral) => (
                          <tr key={referral.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4">#{referral.id}</td>
                            <td className="px-4 py-4">{referral.serviceType}</td>
                            <td className="px-4 py-4">
                              <Badge className={referral.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-sm">{referral.dateCreated}</td>
                            <td className="px-4 py-4 text-sm hidden md:table-cell">{referral.lastUpdated}</td>
                            <td className="px-4 py-4 text-right">
                              <Button variant="ghost" size="sm" className="text-referra-600">
                                View
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
                    Showing {referralsData.length} of {referralsData.length} referrals
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Other tab contents follow same pattern */}
            <TabsContent value="active" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardContent>
                  <div className="overflow-x-auto">
                    {/* Similar table for active referrals */}
                    <p className="py-4">Active referrals will be shown here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inactive" className="mt-0">
              <Card className="border-0 shadow-none">
                <p className="py-12 text-center text-gray-500">No inactive referrals found.</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="archived" className="mt-0">
              <Card className="border-0 shadow-none">
                <p className="py-12 text-center text-gray-500">No archived referrals found.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralList;
