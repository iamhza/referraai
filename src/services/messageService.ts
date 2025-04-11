
import { supabase } from '@/integrations/supabase/client';
import { Message, MessageFormData } from '@/types/message';

export async function sendMessage(messageData: MessageFormData): Promise<Message | null> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select('*')
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}

export async function getMessagesByReferralId(referralId: number): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('referral_id', referralId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId);

    if (error) {
      console.error('Error marking message as read:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
}

export async function getUnreadMessageCount(userId: string): Promise<number> {
  try {
    const { data, error, count } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('recipient_id', userId)
      .eq('read', false);

    if (error) {
      console.error('Error fetching unread messages count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error fetching unread messages count:', error);
    return 0;
  }
}
