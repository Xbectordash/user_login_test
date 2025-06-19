const express = require('express');
const app = express();
const { initDB } = require('./src/config/init-db'); // Import the initDB function
const authRoutes = require('./src/routers/auth-routers'); // Import your routes
const userRoutes =require('./src/routers/user-routers'); // Import your routes


(async () => {
    try {
        // Initialize the database
        await initDB();
        console.log("✅ Database initialized successfully");

        // Middleware to handle errors globally
        app.use((err, req, res, next) => {
            console.error("❌ Error:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        // Middleware setup
        app.use(express.json());

        app.use('/api/auth', authRoutes); // Use the auth routes
        app.use('/api/users', userRoutes); // Use the user routes

        // Now start your server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ Error during app startup:", err);
        process.exit(1);
    }
})();