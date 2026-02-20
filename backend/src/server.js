import app from './app.js';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (redundant but safe)
dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

// Verify critical environment variables
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is not set in environment');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in environment');
    process.exit(1);
}

// Connect to Database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('\n🚀 ==================================');
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 Health check: http://localhost:${PORT}/health`);
        console.log('=====================================\n');
    });
}).catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});