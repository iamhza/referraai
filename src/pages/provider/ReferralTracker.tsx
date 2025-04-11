
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useParams } from 'react-router-dom';
import ReferralTracker from '@/pages/ReferralTracker';

const ProviderReferralTracker = () => {
  const { referralId } = useParams<{ referralId: string }>();
  
  return (
    <DashboardLayout>
      <ReferralTracker />
    </DashboardLayout>
  );
};

export default ProviderReferralTracker;
