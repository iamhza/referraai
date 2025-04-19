import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertTriangle, 
  ArrowRight, 
  Calendar,
  CheckCircle2, 
  Clock, 
  Filter,
  FileText,
  Search,
  Tag,
  Loader2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Define interfaces for our data
interface Referral {
  id: number;
  case_manager_id: string;
  service_type: string;
  urgency: string;
  counties: string[];
  status: string;
  created_at: string;
  mongo_id: string;
  match_stage: string;
  updated_at: string;
  service_hours_preference: string[];
  emergency_services_needed: boolean;
  plan_type: string;
  preferred_start_date: string;
  waiver_type: string;
  additional_notes?: string;
  // PHI data that will be fetched from MongoDB
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  phone?: string;
  email?: string;
  insuranceInfo?: {
    provider?: string;
    policyNumber?: string;
    groupNumber?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  medicalConditions?: string[];
  medications?: string[];
  allergies?: string[];
  primaryCareProvider?: {
    name?: string;
    phone?: string;
    clinic?: string;
  };
}

const ReferralCard = ({ referral }: { referral: Referral }) => {
  // Validate required data
  if (!referral || !referral.id) {
    return null;
  }

  const formattedId = `REF-${referral.id.toString().padStart(4, '0')}`;
  const serviceLabel = referral.service_type || 'General Service';
  
  // Convert status to UI display status
  const displayStatus = referral.status === 'pending' 
    ? 'Pending Matches' 
    : referral.status === 'in-progress'
    ? 'In Progress'
    : referral.status === 'completed'
    ? 'Completed'
    : 'Matched';
  
  // Determine category and color based on waiver type
  const category = referral.waiver_type || referral.plan_type || 'General';
  const categoryMapping: Record<string, string> = {
    'CADI': 'bg-purple-100 text-purple-800',
    'DD': 'bg-blue-100 text-blue-800',
    'EW': 'bg-green-100 text-green-800',
    'CAC': 'bg-orange-100 text-orange-800',
    'BI': 'bg-red-100 text-red-800',
    'CSSP': 'bg-yellow-100 text-yellow-800',
    'CCP': 'bg-indigo-100 text-indigo-800',
    'HFPCP': 'bg-pink-100 text-pink-800',
  };
  const categoryColor = categoryMapping[category] || 'bg-gray-100 text-gray-800';
  
  // Format the date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Format address if available
  const formatAddress = (address: any) => {
    if (!address) return null;
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(', ');
  };

  return (
    <div className="border rounded-lg hover:border-referra-200 transition-colors">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium">{formattedId}</h3>
              <Badge className={
                displayStatus === 'Matched' 
                  ? 'bg-blue-100 text-blue-800' 
                  : displayStatus === 'In Progress' 
                  ? 'bg-green-100 text-green-800'
                  : displayStatus === 'Completed'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-amber-100 text-amber-800'
              }>
                {displayStatus}
              </Badge>
              {referral.urgency === 'High' && (
                <Badge className="bg-red-100 text-red-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Urgent
                </Badge>
              )}
            </div>
            <p className="text-gray-800 mt-1">{serviceLabel}</p>
          </div>
          <Button size="sm" asChild>
            <Link to={`/case-manager/referral-tracker/${referral.id}`}>
              View Details
            </Link>
          </Button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge className={categoryColor}>
            <FileText className="h-3 w-3 mr-1" />
            {category}
          </Badge>
          {referral.emergency_services_needed && (
            <Badge variant="destructive" className="bg-red-100 text-red-800">
              Emergency Services Needed
            </Badge>
          )}
        </div>
        
        {/* Client Information Section */}
        <div className="mt-4 space-y-4">
          {(referral.firstName || referral.lastName) && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Client Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Name:</span>{' '}
                    {`${referral.firstName || ''} ${referral.lastName || ''}`}
                  </p>
                  {referral.dateOfBirth && (
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">DOB:</span>{' '}
                      {new Date(referral.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                  {referral.gender && (
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Sex:</span> {referral.gender}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  {referral.phone && (
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Phone:</span> {referral.phone}
                    </p>
                  )}
                  {referral.email && (
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Email:</span> {referral.email}
                    </p>
                  )}
                  {referral.address && formatAddress(referral.address) && (
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Address:</span>{' '}
                      {formatAddress(referral.address)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Service Details Section */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Service Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                {referral.service_hours_preference && referral.service_hours_preference.length > 0 && (
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Hours:</span>{' '}
                    {referral.service_hours_preference.join(', ')}
                  </p>
                )}
                {referral.preferred_start_date && (
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Start Date:</span>{' '}
                    {new Date(referral.preferred_start_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                {referral.counties && referral.counties.length > 0 && (
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Counties:</span>{' '}
                    {referral.counties.join(', ')}
                  </p>
                )}
                {referral.insuranceInfo?.provider && (
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Insurance:</span>{' '}
                    {referral.insuranceInfo.provider}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Medical Notes Section */}
          {referral.medicalConditions && referral.medicalConditions.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Medical Notes</h4>
              <p className="text-sm text-gray-900">{referral.medicalConditions.join(', ')}</p>
            </div>
          )}

          {/* Additional Notes Section */}
          {referral.additional_notes && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Notes</h4>
              <p className="text-sm text-gray-900">{referral.additional_notes}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Created: {formatDate(referral.created_at)}
          </span>
          <span>Updated: {formatDate(referral.updated_at)}</span>
        </div>
        <Link 
          to={displayStatus === 'Pending Matches' 
            ? `/case-manager/matched-providers/${referral.id}`
            : `/case-manager/referral-tracker/${referral.id}`
          } 
          className="flex items-center text-sm text-referra-600 hover:text-referra-700 hover:underline"
        >
          {displayStatus === 'Pending Matches' ? 'View matches' : 'Track progress'}
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
};

const Referrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchReferrals = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting to fetch referrals...');
      
      // Check authentication first
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) throw authError;
      
      if (!session) {
        console.log('No active session, redirecting to login...');
        // You might want to redirect to login here
        return;
      }
      
      console.log('User authenticated:', session.user);
      
      // 1. Fetch non-PHI referral data from Supabase
      console.log('Fetching referrals from Supabase...');
      const { data: referralsData, error: supabaseError } = await supabase
        .from('referrals')
        .select('*')
        .eq('case_manager_id', session.user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }

      if (!referralsData) {
        console.log('No referrals found');
        setReferrals([]);
        return;
      }

      console.log('Supabase referrals:', referralsData);

      // 2. Fetch PHI data from MongoDB for each referral
      const referralsWithPhi = await Promise.all(
        referralsData.map(async (referral) => {
          if (!referral.mongo_id) {
            console.log(`No mongo_id for referral ${referral.id}, skipping PHI fetch`);
            return referral;
          }

          try {
            console.log(`Fetching PHI for referral ${referral.id} with mongo_id ${referral.mongo_id}`);
            const phiResponse = await fetch(`http://localhost:5001/api/phi/${referral.mongo_id}`);
            
            if (!phiResponse.ok) {
              console.error(`Failed to fetch PHI for referral ${referral.id}:`, await phiResponse.text());
              return referral;
            }

            const phiData = await phiResponse.json();
            console.log(`Got PHI data for referral ${referral.id}:`, phiData);

            if (!phiData.success || !phiData.data) {
              console.error(`Invalid PHI data for referral ${referral.id}:`, phiData);
              return referral;
            }

            return {
              ...referral,
              ...phiData.data
            };
          } catch (err) {
            console.error(`Error fetching PHI for referral ${referral.id}:`, err);
            return referral;
          }
        })
      );

      console.log('Final referrals with PHI:', referralsWithPhi);
      setReferrals(referralsWithPhi);
    } catch (err) {
      console.error('Error in fetchReferrals:', err);
      setError(err.message);
      toast({
        title: 'Error loading referrals',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch referrals on mount and when auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchReferrals();
      } else {
        setReferrals([]);
      }
    });

    // Initial fetch
    fetchReferrals();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Filter referrals based on status and search query
  const pendingReferrals = referrals.filter(ref => ref.status === 'pending');
  const activeReferrals = referrals.filter(ref => 
    ref.status === 'in-progress' || ref.status === 'matched'
  );
  const urgentReferrals = referrals.filter(ref => ref.urgency === 'High');
  
  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Filter by search query if present
  const filterBySearch = (refs: Referral[]) => {
    if (!searchQuery) return refs;
    
    const query = searchQuery.toLowerCase();
    return refs.filter(ref => 
      ref.id?.toString().includes(query) ||
      `${ref.firstName} ${ref.lastName}`.toLowerCase().includes(query) ||
      ref.service_type?.toLowerCase().includes(query) ||
      ref.waiver_type?.toLowerCase().includes(query) ||
      ref.plan_type?.toLowerCase().includes(query)
    );
  };
  
  const filteredAll = filterBySearch(referrals);
  const filteredPending = filterBySearch(pendingReferrals);
  const filteredActive = filterBySearch(activeReferrals);
  const filteredUrgent = filterBySearch(urgentReferrals);

  return (
    <DashboardLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center text-xl font-bold">
          TEST BANNER - HAMZA - {new Date().toLocaleTimeString()}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
            <p className="text-gray-500">Track and manage your service referrals</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="bg-referra-500 hover:bg-referra-600"
              asChild
            >
              <Link to="/case-manager/new-referral">
                Create New Referral
              </Link>
            </Button>
            
            {/* Test MongoDB Connection Button */}
            <Button 
              variant="outline"
              onClick={async () => {
                try {
                  // Display a loading message
                  toast({
                    title: "Testing Connection...",
                    description: "Making a test request to MongoDB",
                  });
                  
                  // Make a simple GET request to our test endpoint
                  const response = await fetch('/api/referrals/test', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  
                  const data = await response.json();
                  console.log('MongoDB test response:', data);
                  
                  // Display success message
                  toast({
                    title: "Connection Successful! ✅",
                    description: "MongoDB connection is working properly",
                    variant: "success",
                  });
                } catch (error) {
                  console.error('MongoDB test error:', error);
                  
                  // Display error message
                  toast({
                    title: "Connection Failed! ❌",
                    description: "Error connecting to MongoDB. Check console for details.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Test MongoDB
            </Button>

            {/* Add Test Referral Button */}
            <Button 
              variant="outline"
              onClick={async () => {
                try {
                  // Get the current user from Supabase
                  const { data: { user }, error: authError } = await supabase.auth.getUser();
                  
                  if (authError || !user) {
                    throw new Error('Authentication error: User not logged in');
                  }

                  // Create test referral data
                  const testReferral = {
                    userId: user.id,
                    firstName: "Test",
                    lastName: "Client",
                    service: "Test Service",
                    status: "pending",
                    waiver_type: "CADI",
                    plan_type: "Test Plan",
                    urgency: "High",
                    notes: "This is a test referral",
                    referenceCode: "TEST-123"
                  };

                  // Display loading message
                  toast({
                    title: "Creating Test Referral...",
                    description: "Submitting test data to MongoDB",
                  });
                  
                  // Submit to API
                  const response = await fetch('/api/referrals', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(testReferral)
                  });
                  
                  const result = await response.json();
                  console.log('Test referral result:', result);
                  
                  if (result.success) {
                    // Display success message
                    toast({
                      title: "Test Referral Created! ✅",
                      description: `Created referral with ID: ${result.id}`,
                      variant: "success",
                    });
                    
                    // Refresh the referrals list
                    window.location.reload();
                  } else {
                    throw new Error(result.error || 'Failed to create test referral');
                  }
                } catch (error) {
                  console.error('Test referral error:', error);
                  
                  // Display error message
                  toast({
                    title: "Failed to Create Test Referral! ❌",
                    description: error instanceof Error ? error.message : "Unknown error occurred",
                    variant: "destructive",
                  });
                }
              }}
            >
              Add Test Referral
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search referrals by ID, name, or service..." 
              className="pl-9"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-referra-500 mb-2" />
            <p className="text-gray-500">Loading referrals...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            <h3 className="font-medium">Error loading referrals</h3>
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Pending</span>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Active</span>
              </TabsTrigger>
              <TabsTrigger value="urgent" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span>Urgent</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredAll.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No referrals found.</p>
                  <Button asChild className="bg-referra-500 hover:bg-referra-600">
                    <Link to="/case-manager/new-referral">
                      Create your first referral
                    </Link>
                  </Button>
                </div>
              ) : (
                filteredAll.map((referral) => (
                  <ReferralCard key={referral.id} referral={referral} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {filteredPending.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No pending referrals found.</p>
                </div>
              ) : (
                filteredPending.map((referral) => (
                  <ReferralCard key={referral.id} referral={referral} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              {filteredActive.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No active referrals found.</p>
                </div>
              ) : (
                filteredActive.map((referral) => (
                  <ReferralCard key={referral.id} referral={referral} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="urgent" className="space-y-4">
              {filteredUrgent.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No urgent referrals found.</p>
                </div>
              ) : (
                filteredUrgent.map((referral) => (
                  <ReferralCard key={referral.id} referral={referral} />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
