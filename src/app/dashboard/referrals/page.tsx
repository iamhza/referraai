'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

interface Referral {
  _id: string;
  firstName: string;
  lastName: string;
  status: string;
  createdAt: string;
  waiverType: string;
  planType: string;
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');
  const [testLoading, setTestLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchUserAndReferrals() {
      try {
        setLoading(true);
        
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error('Please log in to view referrals');
          router.push('/login');
          return;
        }
        
        // Get the user's role from the profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast.error('Error fetching user profile');
          setLoading(false);
          return;
        }
        
        setUserRole(profileData?.role || '');
        
        // Fetch referrals for this user
        const response = await fetch(`/api/referrals?userId=${user.id}`);
        const result = await response.json();
        
        if (result.success) {
          setReferrals(result.data || []);
        } else {
          console.error('Error fetching referrals:', result.error);
          toast.error('Error fetching referrals');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserAndReferrals();
  }, [supabase, router]);
  
  const testMongoDBConnection = async () => {
    try {
      setTestLoading(true);
      toast.loading('Testing MongoDB connection...');
      
      const response = await fetch('/api/referrals/test');
      const result = await response.json();
      
      toast.dismiss();
      
      if (result.success) {
        console.log('MongoDB test successful:', result);
        toast.success('MongoDB connection successful! 🎉');
        toast.success(`Connected to database: ${result.details.databaseName}`);
        
        if (result.details.collections.includes('referracollection')) {
          toast.success('Found "referracollection" in the database!');
        }
      } else {
        console.error('MongoDB test failed:', result);
        toast.error('MongoDB connection failed');
        toast.error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.dismiss();
      toast.error('Error testing MongoDB connection');
    } finally {
      setTestLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-8">Loading Referrals...</h1>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-200 rounded col-span-2"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If the user is not a case manager, show access denied
  if (userRole && userRole !== 'case_manager') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1>
          <p className="mb-8">
            You do not have permission to view referrals. Only case managers can access this page.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Referrals</h1>
          <div className="flex space-x-2">
            <button 
              onClick={testMongoDBConnection}
              disabled={testLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {testLoading ? 'Testing...' : 'Test MongoDB'}
            </button>
            <button 
              onClick={() => router.push('/dashboard/referrals/new')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create New Referral
            </button>
          </div>
        </div>
        
        {referrals.length === 0 ? (
          <div className="bg-white shadow-md rounded p-6 text-center">
            <p className="text-gray-600 mb-4">You haven't created any referrals yet.</p>
            <p className="mb-4">
              Start by clicking the "Create New Referral" button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {referrals.map((referral) => (
              <div 
                key={referral._id} 
                className="bg-white shadow-md rounded p-6"
                onClick={() => router.push(`/dashboard/referrals/${referral._id}`)}
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">
                    {referral.firstName} {referral.lastName}
                  </h2>
                  <span className={`px-2 py-1 rounded text-sm ${
                    referral.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : referral.status === 'accepted' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {referral.status?.charAt(0).toUpperCase() + referral.status?.slice(1) || 'Pending'}
                  </span>
                </div>
                <p className="text-gray-600 my-2">
                  {new Date(referral.createdAt).toLocaleDateString()}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Waiver Type</p>
                    <p className="font-medium">{referral.waiverType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plan Type</p>
                    <p className="font-medium">{referral.planType || 'N/A'}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer">
                  View Details
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 