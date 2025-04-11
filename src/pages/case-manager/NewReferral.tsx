
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ReferralForm from '@/components/forms/ReferralForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewReferral = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/case-manager" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to dashboard
          </Link>
        </Button>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Referral</h1>
            <p className="text-gray-500 mt-1">
              Find the right service provider for your client's needs
            </p>
          </div>
        </div>
        
        <ReferralForm />
      </div>
    </DashboardLayout>
  );
};

export default NewReferral;
