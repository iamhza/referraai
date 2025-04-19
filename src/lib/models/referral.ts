import { ObjectId } from 'mongodb';

// Client demographic information
export interface ClientDemographics {
  ageGroup: 'infant' | 'child' | 'teen' | 'adult' | 'senior';
  gender?: string;
  preferredLanguages?: string[];
  culturalPreferences?: string[];
  accessibilityNeeds?: string[];
  requiresTransportation: boolean;
}

// Service requirements
export interface ServiceRequirements {
  serviceType: string;
  urgency: 'low' | 'medium' | 'high';
  preferredStartDate: Date;
  preferredProviderType?: string[];
  insurance?: string[];
  availability?: string[];
  requiresEmergencyService: boolean;
  additionalNotes?: string;
}

// Referral status tracking
export interface ReferralStatus {
  status: 'draft' | 'submitted' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  submittedAt?: Date;
  matchedAt?: Date;
  completedAt?: Date;
  lastUpdated: Date;
  notes?: string[];
}

// Main referral interface
export interface Referral {
  _id?: ObjectId;
  clientId: string;  // Encrypted identifier for the client
  caseManagerId: string;  // Supabase user ID of the case manager
  demographics: ClientDemographics;
  serviceRequirements: ServiceRequirements;
  status: ReferralStatus;
  createdAt: Date;
  updatedAt: Date;
  // Encryption metadata
  encryptionVersion?: number;
  encryptedFields?: string[];  // List of fields that are encrypted
}

// Referral creation type (without system-generated fields)
export type CreateReferralInput = Omit<Referral, '_id' | 'createdAt' | 'updatedAt'>; 