
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  ArrowUpDown,
  Calendar
} from 'lucide-react';

const AdminReferrals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  // Mock referral data - in a real app this would come from an API
  const allReferrals = [
    { 
      id: 4829, 
      service: "Adult rehabilitative mental health services (ARMHS)", 
      caseManager: "Sarah Johnson",
      dateCreated: "Apr 9, 2025",
      urgency: "high", 
      county: "Hennepin",
      status: "pending", 
      matchCount: 0
    },
    { 
      id: 4830, 
      service: "Housing stabilization services (HSS)", 
      caseManager: "Mike Peterson",
      dateCreated: "Apr 10, 2025",
      urgency: "medium", 
      county: "Ramsey",
      status: "matched", 
      matchCount: 4
    },
    { 
      id: 4831, 
      service: "Opioid treatment – non-residential", 
      caseManager: "Aisha Patel",
      dateCreated: "Apr 7, 2025",
      urgency: "high", 
      county: "Dakota",
      status: "pending", 
      matchCount: 0
    },
    { 
      id: 4832, 
      service: "Family training", 
      caseManager: "Robert Kim",
      dateCreated: "Apr 5, 2025",
      urgency: "low", 
      county: "Anoka",
      status: "active", 
      matchCount: 1
    },
    { 
      id: 4833, 
      service: "Mental health targeted case management", 
      caseManager: "Emily Chen",
      dateCreated: "Apr 4, 2025",
      urgency: "medium", 
      county: "Washington",
      status: "completed", 
      matchCount: 3
    },
    { 
      id: 4834, 
      service: "Housing transition services", 
      caseManager: "Luis Gonzalez",
      dateCreated: "Apr 3, 2025",
      urgency: "high", 
      county: "Hennepin",
      status: "rejected", 
      matchCount: 0
    },
    { 
      id: 4835, 
      service: "Substance use disorder treatment", 
      caseManager: "Natasha Singh",
      dateCreated: "Apr 2, 2025",
      urgency: "medium", 
      county: "Dakota",
      status: "pending", 
      matchCount: 0
    }
  ];
  
  // Filter referrals based on search and filters
  const filteredReferrals = allReferrals.filter(referral => {
    const matchesSearch = 
      searchTerm === '' || 
      referral.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.caseManager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || referral.urgency === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });
  
  // Get status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            Pending Match
          </Badge>
        );
      case 'matched':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            Providers Matched
          </Badge>
        );
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center">
            <X className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get urgency badge styles
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
            <p className="text-gray-500">Monitor and manage all referrals in the system</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              <Filter className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort Options
            </Button>
          </div>
        </div>
        
        <Card className="mb-6 border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filter Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by ID, service, or case manager..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending Match</SelectItem>
                    <SelectItem value="matched">Providers Matched</SelectItem>
                    <SelectItem value="active">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgency</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-none">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Case Manager</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead className="hidden md:table-cell">County</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex flex-col items-center">
                          <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-500">No referrals found matching your filters</p>
                          <Button 
                            variant="link" 
                            onClick={() => {
                              setSearchTerm('');
                              setStatusFilter('all');
                              setUrgencyFilter('all');
                            }}
                          >
                            Clear all filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReferrals.map((referral) => (
                      <TableRow key={referral.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{referral.id}</TableCell>
                        <TableCell className="max-w-xs truncate">{referral.service}</TableCell>
                        <TableCell className="hidden md:table-cell">{referral.caseManager}</TableCell>
                        <TableCell className="hidden md:table-cell">{referral.dateCreated}</TableCell>
                        <TableCell>{getStatusBadge(referral.status)}</TableCell>
                        <TableCell>{getUrgencyBadge(referral.urgency)}</TableCell>
                        <TableCell className="hidden md:table-cell">{referral.county}</TableCell>
                        <TableCell className="text-right">
                          {referral.status === 'pending' ? (
                            <Link to={`/admin/referral-matching/${referral.id}`}>
                              <Button size="sm" className="bg-referra-500 hover:bg-referra-600">
                                Match Now
                              </Button>
                            </Link>
                          ) : (
                            <Link to={`/admin/referral-matching/${referral.id}`}>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReferrals;
