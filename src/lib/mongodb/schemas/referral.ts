import { Schema, model, Document } from 'mongoose';

// Define interfaces for type safety
export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ISafetyInfo {
  hasHistoryOfViolence: boolean;
  violenceNotes?: string;
  isSexOffender: boolean;
  sexOffenderNotes?: string;
}

export interface IReferral extends Document {
  // User Information
  userId: string; // Supabase user ID
  userEmail: string; // User's email from Supabase

  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  sex: 'male' | 'female' | 'other';
  pmiNumber: string;
  address: IAddress;

  // Insurance Information
  insuranceProvider: string;
  insuranceId: string;

  // Program Information
  waiverType: 'CADI' | 'DD' | 'EW' | 'CAC' | 'BI' | '';
  planType: 'CSSP' | 'CCP' | 'HFPCP' | '';

  // Safety Information
  safetyInfo: ISafetyInfo;

  // Additional Notes
  additionalNotes?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

// Define the safety information sub-schema
const SafetyInfoSchema = new Schema<ISafetyInfo>({
  hasHistoryOfViolence: { type: Boolean, required: true },
  violenceNotes: { type: String },
  isSexOffender: { type: Boolean, required: true },
  sexOffenderNotes: { type: String }
}, { _id: false });

// Define the address sub-schema
const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true }
}, { _id: false });

// Define the main referral schema
const ReferralSchema = new Schema<IReferral>({
  // User Information
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },

  // Personal Information
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: { 
    type: String, 
    required: true,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  dateOfBirth: { type: Date, required: true },
  sex: { 
    type: String, 
    required: true, 
    enum: ['male', 'female', 'other'] 
  },
  pmiNumber: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  address: { type: AddressSchema, required: true },

  // Insurance Information
  insuranceProvider: { type: String, required: true, trim: true },
  insuranceId: { type: String, required: true, trim: true },

  // Program Information
  waiverType: { 
    type: String, 
    required: true, 
    enum: ['CADI', 'DD', 'EW', 'CAC', 'BI', ''] 
  },
  planType: { 
    type: String, 
    required: true, 
    enum: ['CSSP', 'CCP', 'HFPCP', ''] 
  },

  // Safety Information
  safetyInfo: { type: SafetyInfoSchema, required: true },

  // Additional Notes
  additionalNotes: { type: String, trim: true },

  // Metadata
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create indexes for frequently queried fields
ReferralSchema.index({ pmiNumber: 1 }, { unique: true });
ReferralSchema.index({ status: 1 });
ReferralSchema.index({ createdAt: -1 });
ReferralSchema.index({ lastName: 1, firstName: 1 });

// Export the model
export const Referral = model<IReferral>('Referral', ReferralSchema); 