
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useClientData(clientId?: string) {
  const [searchTerm, setSearchTerm] = useState('');
  const { session } = useAuth();
  const isAuthenticated = !!session;

  const {
    data: client,
    isLoading: isLoadingClient,
    error: clientError,
  } = useQuery({
    queryKey: ['client', clientId],
    queryFn: async () => {
      if (!clientId || !isAuthenticated) return null;

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', clientId)
          .maybeSingle();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching client:', error);
        return null;
      }
    },
    enabled: !!clientId && isAuthenticated,
  });

  const {
    data: clients = [],
    isLoading: isLoadingClients,
    error: clientsError,
  } = useQuery({
    queryKey: ['clients', searchTerm],
    queryFn: async () => {
      if (!isAuthenticated) return [];

      try {
        let query = supabase.from('user_profiles').select('*');

        if (searchTerm) {
          query = query.ilike('full_name', `%${searchTerm}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  return {
    client,
    clients,
    isLoadingClient,
    isLoadingClients,
    clientError,
    clientsError,
    searchTerm,
    setSearchTerm,
  };
}
