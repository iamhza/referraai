
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useMessages } from '@/hooks/useMessages';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface MessagePanelProps {
  showMessages: boolean;
  setShowMessages: (value: boolean) => void;
}

interface MessageFormValues {
  content: string;
}

// MessageButton component
export const MessageButton = ({ showMessages, setShowMessages, unreadCount }: MessagePanelProps & { unreadCount: number }) => (
  <div 
    className={`fixed bottom-6 right-6 z-50 transition-all duration-300 animate-fade-in ${showMessages ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
  >
    <button 
      onClick={() => setShowMessages(true)}
      className="bg-referra-500 hover:bg-referra-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 relative"
      aria-label="Open messages"
    >
      <MessageSquare className="h-6 w-6" />
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount}
        </div>
      )}
    </button>
  </div>
);

// MessagePanel component
export const MessagePanel = ({ showMessages, setShowMessages }: MessagePanelProps) => {
  // We're using referral_id 1001 as an example - in a real app, this would be dynamic
  const { messages, isLoading, sendMessage, markMessagesAsRead } = useMessages(1001);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const { register, handleSubmit, reset, formState } = useForm<MessageFormValues>();
  const { isSubmitting } = formState;

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && showMessages) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showMessages]);

  // Mark messages as read when panel is opened
  useEffect(() => {
    if (showMessages && markMessagesAsRead) {
      markMessagesAsRead();
    }
  }, [showMessages, markMessagesAsRead]);

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();
  }, []);

  const onSubmit = async (data: MessageFormValues) => {
    if (!data.content.trim() || !user) return;
    
    // Call the sendMessage method with proper parameters
    sendMessage('provider-id-here'); // passing recipient_id as a separate parameter
    
    // Reset the form after sending
    reset();
  };

  return (
    <div 
      className={`fixed bottom-0 right-0 w-full sm:w-96 h-[calc(100vh-5rem)] sm:h-[30rem] bg-white border-l border-t sm:border-t-0 sm:border-l sm:rounded-tl-xl shadow-2xl z-50 transition-all duration-300 ease-in-out ${
        showMessages ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Messages</h2>
        <button 
          onClick={() => setShowMessages(false)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-referra-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
            <p className="text-sm">No messages yet</p>
            <p className="text-xs mt-1">Send a message to start the conversation</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = user && message.sender_id === user.id;
              return (
                <div 
                  key={message.id} 
                  className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar>
                    <div className={`${isCurrentUser ? 'bg-teal-200 text-teal-800' : 'bg-referra-200 text-referra-800'} w-10 h-10 rounded-full flex items-center justify-center`}>
                      {isCurrentUser ? 'ME' : 'PR'}
                    </div>
                  </Avatar>
                  <div className={`${isCurrentUser ? 'bg-referra-100' : 'bg-gray-100'} p-3 rounded-2xl ${isCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[75%]`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {format(new Date(message.created_at), 'h:mm a')}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-referra-400"
            {...register("content", { required: true })}
            disabled={isSubmitting}
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-referra-500 text-white p-2.5 rounded-lg hover:bg-referra-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};
