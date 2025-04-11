
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import OpenReferrals from '@/components/dashboard/OpenReferrals';
import ReferralPipeline from '@/components/dashboard/ReferralPipeline';
import PriorityMetrics from '@/components/dashboard/PriorityMetrics';
import ActionPanel from '@/components/dashboard/ActionPanel';
import { FeaturedProviders } from '@/components/dashboard/FeaturedProviders';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <DashboardHeader />
        
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsOverview />
          <PriorityMetrics />
          <ReferralPipeline />
        </div>
        
        {/* Open Referrals Section */}
        <OpenReferrals />
        
        {/* Actions & Providers Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ActionPanel />
          </div>
          <div>
            <FeaturedProviders />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
