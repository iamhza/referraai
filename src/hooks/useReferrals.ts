
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export function useReferrals(referralId?: string | number) {
  const { user, isAdmin, isCaseManager } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [urgencyFilter, setUrgencyFilter] = useState<string | null>(null);

  // Convert referralId to number if it's a string
  const numericReferralId = typeof referralId === 'string' ? parseInt(referralId, 10) : referralId;

  // Get a single referral by ID
  const {
    data: referral,
    isLoading: isLoadingReferral,
    error: referralError,
  } = useQuery({
    queryKey: ['referral', numericReferralId],
    queryFn: async () => {
      if (!numericReferralId) return null;

      const { data, error } = await supabase
        .from('referrals')
        .select('*, user_profiles(*)')
        .eq('id', numericReferralId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!numericReferralId,
  });

  // Get all referrals with filters
  const {
    data: referrals = [],
    isLoading: isLoadingReferrals,
    error: referralsError,
    refetch: refetchReferrals,
  } = useQuery({
    queryKey: ['referrals', statusFilter, urgencyFilter, isAdmin, isCaseManager, user?.id],
    queryFn: async () => {
      let query = supabase.from('referrals').select('*');

      // Apply role-based filters
      if (!isAdmin && isCaseManager && user) {
        query = query.eq('case_manager_id', user.id);
      }

      // Apply status filter if selected
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      // Apply urgency filter if selected
      if (urgencyFilter) {
        query = query.eq('urgency', urgencyFilter);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Create a new referral
  const createReferralMutation = useMutation({
    mutationFn: async (referralData: any) => {
      const { data, error } = await supabase
        .from('referrals')
        .insert(referralData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast({
        title: 'Referral created',
        description: `Referral #${data.id} has been created successfully.`,
      });
      return data;
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating referral',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update a referral
  const updateReferralMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: any }) => {
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
      
      const { data: updatedData, error } = await supabase
        .from('referrals')
        .update(data)
        .eq('id', numericId)
        .select()
        .single();

      if (error) throw error;
      return updatedData;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      queryClient.invalidateQueries({ queryKey: ['referral', data.id] });
      toast({
        title: 'Referral updated',
        description: `Referral #${data.id} has been updated successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating referral',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    referral,
    referrals,
    isLoadingReferral,
    isLoadingReferrals,
    referralError,
    referralsError,
    statusFilter,
    setStatusFilter,
    urgencyFilter,
    setUrgencyFilter,
    createReferral: createReferralMutation.mutate,
    updateReferral: updateReferralMutation.mutate,
    isCreating: createReferralMutation.isPending,
    isUpdating: updateReferralMutation.isPending,
    refetchReferrals,
  };
}
