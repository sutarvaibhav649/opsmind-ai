import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongoose connected to Atlas: ${conn.connection.host}`);
    } catch (err) {
        console.error('Could not connect to MongoDB Atlas', err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
