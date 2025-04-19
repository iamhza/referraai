import { config } from 'dotenv';
import { connectToDatabase } from './mongodb';

// Load environment variables
config({ path: '.env.local' });

// Debug environment variables
console.log('Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);

async function testConnection() {
  try {
    console.log('\nTesting MongoDB connection...');
    const { client, db } = await connectToDatabase();
    
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('\nAvailable collections:');
    collections.forEach(collection => {
      console.log(` - ${collection.name}`);
    });

    // Close the connection
    await client.close();
    console.log('\nConnection test completed successfully.');
  } catch (error) {
    console.error('Connection test failed:', error);
    process.exit(1);
  }
}

// Run the test
testConnection(); 