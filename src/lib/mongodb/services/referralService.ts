import { Referral, IReferral } from '../schemas/referral';
import connectDB from '../connection';

export class ReferralService {
  // Create a new referral
  static async createReferral(referralData: Omit<IReferral, keyof Document>) {
    try {
      await connectDB();
      const referral = new Referral(referralData);
      return await referral.save();
    } catch (error) {
      console.error('Error creating referral:', error);
      throw new Error('Failed to create referral');
    }
  }

  // Get a referral by ID
  static async getReferralById(id: string) {
    try {
      await connectDB();
      return await Referral.findById(id);
    } catch (error) {
      console.error('Error fetching referral:', error);
      throw new Error('Failed to fetch referral');
    }
  }

  // Get referrals by status
  static async getReferralsByStatus(status: IReferral['status']) {
    try {
      await connectDB();
      return await Referral.find({ status }).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error fetching referrals by status:', error);
      throw new Error('Failed to fetch referrals');
    }
  }

  // Update a referral
  static async updateReferral(id: string, updateData: Partial<IReferral>) {
    try {
      await connectDB();
      return await Referral.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } catch (error) {
      console.error('Error updating referral:', error);
      throw new Error('Failed to update referral');
    }
  }

  // Delete a referral
  static async deleteReferral(id: string) {
    try {
      await connectDB();
      return await Referral.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting referral:', error);
      throw new Error('Failed to delete referral');
    }
  }

  // Search referrals by name
  static async searchReferralsByName(query: string) {
    try {
      await connectDB();
      return await Referral.find({
        $or: [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } }
        ]
      }).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error searching referrals:', error);
      throw new Error('Failed to search referrals');
    }
  }

  // Get referral by PMI number
  static async getReferralByPMI(pmiNumber: string) {
    try {
      await connectDB();
      return await Referral.findOne({ pmiNumber });
    } catch (error) {
      console.error('Error fetching referral by PMI:', error);
      throw new Error('Failed to fetch referral');
    }
  }

  // Get referrals by user ID
  static async getReferralsByUserId(userId: string) {
    try {
      await connectDB();
      return await Referral.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error fetching user referrals:', error);
      throw new Error('Failed to fetch user referrals');
    }
  }
} 