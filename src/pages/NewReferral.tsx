
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/DashboardLayout';
import ReferralForm from '@/components/forms/ReferralForm';

const NewReferral = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to dashboard
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-white p-6 rounded-lg shadow-sm border-l-4 border-referra-500">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">New Referral Request</h1>
                <p className="text-gray-500 mt-1">Complete the form to match with service providers</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Step 1 of 3: Client Information
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <ReferralForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewReferral;
