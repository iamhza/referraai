
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpenReferrals from '@/components/dashboard/OpenReferrals';
import PriorityMetrics from '@/components/dashboard/PriorityMetrics';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import FeaturedProviders from '@/components/dashboard/FeaturedProviders';

const CaseManagerDashboard = () => {
  // Placeholder name - in a real app this would come from user context/state
  const userName = "Casey";
  
  return (
    <DashboardLayout>
      <div className="container px-6 py-6 max-w-6xl mx-auto">
        {/* Welcome Header with Action Button */}
        <Card className="border-none shadow-sm mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}</h1>
                <p className="text-gray-500 mt-1">Manage your service referrals</p>
              </div>
              <Button className="bg-referra-500 hover:bg-referra-600" asChild>
                <Link to="/case-manager/new-referral">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Referral
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Referrals (Main Focus) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Open Referrals Section */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Open Referrals</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/case-manager/referrals" className="text-referra-600 hover:text-referra-800 flex items-center">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <OpenReferrals />
              </CardContent>
            </Card>
            
            {/* Referral Pipeline */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Referral Pipeline</CardTitle>
                <Button variant="ghost" size="sm" className="text-referra-600 hover:text-referra-800">
                  View Details <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <ReferralPipeline />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Supporting Content */}
          <div className="space-y-6">
            {/* Priority Actions */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Priority Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <PriorityMetrics />
              </CardContent>
            </Card>
            
            {/* Featured Providers */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <FeaturedProviders />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseManagerDashboard;
