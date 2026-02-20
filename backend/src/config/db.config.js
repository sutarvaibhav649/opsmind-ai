import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Set DNS servers for stability
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Load environment variables
dotenv.config({ path: './.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;