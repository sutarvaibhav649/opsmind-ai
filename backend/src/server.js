import app from './app.js';
import connectDB from './config/db.config.js';

const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
