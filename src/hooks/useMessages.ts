
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Message, MessageFormData } from '@/types/message';
import { sendMessage, getMessagesByReferralId, markMessageAsRead } from '@/services/messageService';
import { useAuth } from '@/contexts/AuthContext';

export function useMessages(referralId: number) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState<string>('');

  const { 
    data: messages = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['messages', referralId],
    queryFn: () => getMessagesByReferralId(referralId),
    enabled: !!referralId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (messageData: MessageFormData) => sendMessage(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', referralId] });
      setNewMessage('');
    }
  });

  const readMessageMutation = useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', referralId] });
    }
  });

  const handleSendMessage = (recipientId?: string) => {
    if (!user || !newMessage.trim()) return;

    const messageData: MessageFormData = {
      content: newMessage.trim(),
      referral_id: referralId,
      sender_id: user.id,
      recipient_id: recipientId
    };

    sendMessageMutation.mutate(messageData);
  };

  const handleMarkAsRead = (messageId: string) => {
    readMessageMutation.mutate(messageId);
  };

  // Mark all messages as read
  const markMessagesAsRead = () => {
    if (user && messages.length > 0) {
      messages.forEach(message => {
        if (message.recipient_id === user.id && !message.read) {
          handleMarkAsRead(message.id);
        }
      });
    }
  };

  // Auto-mark messages as read when viewed
  useEffect(() => {
    if (user && messages.length > 0) {
      messages.forEach(message => {
        if (message.recipient_id === user.id && !message.read) {
          handleMarkAsRead(message.id);
        }
      });
    }
  }, [messages, user]);

  return {
    messages,
    isLoading,
    error,
    newMessage,
    setNewMessage,
    sendMessage: handleSendMessage,
    markAsRead: handleMarkAsRead,
    markMessagesAsRead,
    refetchMessages: refetch
  };
}
