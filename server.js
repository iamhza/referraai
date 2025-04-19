import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const router = express.Router();  // Use Express's built-in Router
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration
const DB_NAME = 'referradb';
const PHI_COLLECTION = 'phi';  // Collection for Protected Health Information
const uri = process.env.MONGODB_URI;

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!uri) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase configuration is missing in .env.local');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Define PHI Schema for validation
const PHI_SCHEMA = {
  firstName: String,
  middleName: String,
  lastName: String,
  dateOfBirth: Date,
  sex: String,
  pmiNumber: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  insuranceProvider: String,
  insuranceId: String,
  safetyInfo: {
    hasHistoryOfViolence: Boolean,
    violenceNotes: String,
    isSexOffender: Boolean,
    sexOffenderNotes: String
  },
  medicalNotes: String,
  createdAt: Date,
  updatedAt: Date
};

console.log('Attempting to connect to MongoDB cluster...');
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB cluster');
    
    // Verify we can access the database and collection
    const db = client.db(DB_NAME);
    const collections = await db.listCollections().toArray();
    console.log(`Collections in ${DB_NAME}:`, collections.map(col => col.name));
    
    // Create PHI collection if it doesn't exist
    if (!collections.find(col => col.name === PHI_COLLECTION)) {
      console.log(`Creating collection ${PHI_COLLECTION}`);
      await db.createCollection(PHI_COLLECTION);
    }
    
    console.log(`Successfully connected to ${DB_NAME}.${PHI_COLLECTION}`);
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

// Use the router for all /api routes
app.use('/api', router);

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    await client.db().command({ ping: 1 });
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: DB_NAME,
      collection: PHI_COLLECTION
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error', 
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Create new PHI record
router.post('/phi', async (req, res) => {
  try {
    const phiData = req.body;
    
    // Basic validation of required fields
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'pmiNumber'];
    const missingFields = requiredFields.filter(field => !phiData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Add timestamps
    const phiRecord = {
      ...phiData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await client.db(DB_NAME)
      .collection(PHI_COLLECTION)
      .insertOne(phiRecord);
      
    console.log('Created new PHI record with ID:', result.insertedId);
    res.json({ 
      success: true, 
      mongoPhiId: result.insertedId,
      message: 'PHI data stored successfully'
    });
  } catch (err) {
    console.error('Error creating PHI record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get PHI by ID
router.get('/phi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid MongoDB ID format' });
    }
    
    const phiData = await client.db(DB_NAME)
      .collection(PHI_COLLECTION)
      .findOne({ _id: objectId });
      
    if (!phiData) {
      return res.status(404).json({ error: 'PHI data not found' });
    }
    
    // Log successful PHI fetch (without sensitive data)
    console.log(`Successfully fetched PHI data for ID: ${id}`, {
      _id: phiData._id.toString(),
      name: `${phiData.firstName} ${phiData.lastName}`
    });
    
    // Transform the data to match frontend expectations
    const transformedData = {
      firstName: phiData.firstName,
      lastName: phiData.lastName,
      dateOfBirth: phiData.dateOfBirth,
      sex: phiData.sex,
      email: phiData.email,
      phone: phiData.phone,
      address: phiData.address,
      insuranceInfo: {
        provider: phiData.insuranceProvider,
        policyNumber: phiData.insuranceId
      },
      safetyInfo: phiData.safetyInfo,
      medicalNotes: phiData.medicalNotes
    };
    
    res.json({ 
      success: true, 
      data: transformedData
    });
  } catch (err) {
    console.error('Error fetching PHI data:', err);
    res.status(500).json({ error: 'Internal server error while fetching PHI data' });
  }
});

// Get PHI records by user ID
router.get('/phi', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ 
        error: 'userId is required'
      });
    }
    
    const phiRecords = await client.db(DB_NAME)
      .collection(PHI_COLLECTION)
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
      
    console.log(`Found ${phiRecords.length} PHI records for user ${userId}`);
    res.json({ 
      success: true, 
      count: phiRecords.length,
      data: phiRecords 
    });
  } catch (err) {
    console.error('Error fetching PHI records:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get referrals by user ID
router.get('/referrals', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ 
        error: 'userId is required'
      });
    }

    // Get PHI data from MongoDB first
    const phiRecords = await client.db(DB_NAME)
      .collection(PHI_COLLECTION)
      .find({ userId })
      .toArray();

    console.log('PHI records found:', phiRecords.map(record => ({
      _id: record._id.toString(),
      name: `${record.firstName} ${record.lastName}`
    })));

    // Get non-PHI data from Supabase
    const { data: supabaseData, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('case_manager_id', userId);

    if (error) {
      throw error;
    }

    console.log('Supabase referrals:', supabaseData.map(ref => ({
      id: ref.id,
      mongo_id: ref.mongo_id
    })));

    // Combine the data
    const combinedData = supabaseData.map(referral => {
      // Convert mongo_id to ObjectId for comparison if it's a string
      const mongoId = typeof referral.mongo_id === 'string' ? 
        new ObjectId(referral.mongo_id) : referral.mongo_id;

      const phiData = phiRecords.find(phi => 
        phi._id.toString() === mongoId?.toString()
      );

      console.log(`Matching referral ${referral.id} (mongo_id: ${referral.mongo_id}) with PHI:`, 
        phiData ? `Found - ${phiData.firstName} ${phiData.lastName}` : 'Not found');

      if (phiData) {
        return {
          ...referral,
          firstName: phiData.firstName,
          lastName: phiData.lastName,
          dateOfBirth: phiData.dateOfBirth,
          sex: phiData.sex,
          email: phiData.email,
          phone: phiData.phone,
          address: phiData.address,
          insuranceInfo: {
            provider: phiData.insuranceProvider,
            policyNumber: phiData.insuranceId
          },
          safetyInfo: phiData.safetyInfo,
          medicalNotes: phiData.medicalNotes
        };
      }
      return referral;
    });

    res.json({ 
      success: true, 
      data: combinedData 
    });
  } catch (err) {
    console.error('Error fetching referrals:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Health check available at http://localhost:${port}/health`);
    console.log(`Using database: ${DB_NAME}`);
    console.log(`Using collection: ${PHI_COLLECTION}`);
  });
}); 