
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import {
  Search,
  CheckCircle,
  XCircle,
  User,
  Users,
  Filter,
  MoreHorizontal,
  Shield,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Mock user data - in a real app this would come from an API
  const allUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@healthcare.org",
      phone: "612-555-1234",
      role: "case_manager",
      organization: "Hennepin County Human Services",
      joinDate: "Apr 9, 2025",
      status: "active",
      lastActive: "Today, 10:23 AM"
    },
    {
      id: 2,
      name: "Michael Rivera",
      email: "m.rivera@wellnesscenter.com",
      phone: "612-555-2345",
      role: "provider",
      organization: "Wellness Center MN",
      joinDate: "Mar 15, 2025",
      status: "active",
      lastActive: "Yesterday, 3:45 PM"
    },
    {
      id: 3,
      name: "Aisha Patel",
      email: "aisha.p@ramseycounty.gov",
      phone: "651-555-3456",
      role: "case_manager",
      organization: "Ramsey County Social Services",
      joinDate: "Apr 1, 2025",
      status: "active",
      lastActive: "Today, 9:12 AM"
    },
    {
      id: 4,
      name: "Robert Kim",
      email: "r.kim@familycounseling.org",
      phone: "612-555-4567",
      role: "provider",
      organization: "Family Counseling Services",
      joinDate: "Feb 27, 2025",
      status: "inactive",
      lastActive: "Mar 28, 2025"
    },
    {
      id: 5,
      name: "Emily Chen",
      email: "e.chen@mentalhealthpartners.org",
      phone: "651-555-5678",
      role: "provider",
      organization: "Mental Health Partners",
      joinDate: "Mar 10, 2025",
      status: "pending",
      lastActive: "Not yet active"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.w@anokacounty.gov",
      phone: "763-555-6789",
      role: "case_manager",
      organization: "Anoka County Human Services",
      joinDate: "Apr 5, 2025",
      status: "active",
      lastActive: "Yesterday, 11:30 AM"
    },
    {
      id: 7,
      name: "Olivia Smith",
      email: "o.smith@housingfirst.org",
      phone: "612-555-7890",
      role: "provider",
      organization: "Housing First Minnesota",
      joinDate: "Mar 22, 2025",
      status: "pending",
      lastActive: "Not yet active"
    }
  ];

  // Filter users based on search and filters
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'case_manager':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
            <User className="mr-1 h-3 w-3" />
            Case Manager
          </Badge>
        );
      case 'provider':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center">
            <Users className="mr-1 h-3 w-3" />
            Provider
          </Badge>
        );
      case 'admin':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center">
            <Shield className="mr-1 h-3 w-3" />
            Admin
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center">
            <XCircle className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleViewUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  const handleApproveUser = (userId: number) => {
    // In a real app, this would call an API to approve the user
    console.log(`Approving user with ID: ${userId}`);
    // For demo purposes, we'll just show an alert
    alert(`User has been approved successfully`);
  };

  const handleSuspendUser = (userId: number) => {
    // In a real app, this would call an API to suspend the user
    console.log(`Suspending user with ID: ${userId}`);
    // For demo purposes, we'll just show an alert
    alert(`User has been suspended successfully`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500">Manage case managers and providers in the system</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <User className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>

        <Card className="mb-6 border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search users by name, email, or organization..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="case_manager">Case Managers</SelectItem>
                    <SelectItem value="provider">Providers</SelectItem>
                    <SelectItem value="admin">Administrators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
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
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Organization</TableHead>
                    <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">{user.organization}</TableCell>
                      <TableCell className="hidden lg:table-cell">{user.joinDate}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500"
                            onClick={() => handleViewUserDetails(user)}
                          >
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewUserDetails(user)}>
                                View Details
                              </DropdownMenuItem>
                              {user.status === 'pending' && (
                                <DropdownMenuItem onClick={() => handleApproveUser(user.id)}>
                                  Approve User
                                </DropdownMenuItem>
                              )}
                              {user.status === 'active' && (
                                <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-red-600">
                                  Suspend Access
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Reset Password
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center">User Details</DialogTitle>
              <DialogDescription className="text-center">
                {getRoleBadge(selectedUser.role)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <h3 className="text-lg font-semibold mb-2">{selectedUser.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <p>{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <p>{selectedUser.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{selectedUser.organization}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p>{selectedUser.joinDate}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedUser.status)}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p>{selectedUser.lastActive}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">• Logged in today at 10:23 AM</p>
                  <p className="text-gray-600">• Created new referral #4832 on Apr 5, 2025</p>
                  <p className="text-gray-600">• Updated profile information on Apr 3, 2025</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-end">
              {selectedUser.status === 'pending' ? (
                <Button onClick={() => handleApproveUser(selectedUser.id)}>
                  Approve User
                </Button>
              ) : selectedUser.status === 'active' ? (
                <Button variant="destructive" onClick={() => handleSuspendUser(selectedUser.id)}>
                  Suspend Access
                </Button>
              ) : (
                <Button onClick={() => handleApproveUser(selectedUser.id)}>
                  Reactivate User
                </Button>
              )}
              <Button variant="secondary" onClick={() => setIsUserDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
