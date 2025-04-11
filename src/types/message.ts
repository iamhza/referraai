
export interface Message {
  id: string;
  referral_id: number;
  sender_id: string;
  recipient_id?: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface MessageFormData {
  content: string;
  referral_id: number;
  recipient_id?: string;
  sender_id: string;
}
