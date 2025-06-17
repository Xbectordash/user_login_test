const express = require('express');
const app = express();
const { ensureDatabaseExists, connectDB } = require('./src/config/database');
const { initDB } = require('./src/model/initDB'); // model syncing file

(async () => {
    try {
        await ensureDatabaseExists();  // Step 1: Make sure DB exists
        await connectDB();             // Step 2: Connect to DB
        await initDB();                // Step 3: Sync models to DB
        console.log("✅ App initialization complete");


        // Middleware setup
        app.use(express.json()); // For parsing application/json
        const authRoutes = require('./src/routers/routers'); // Import your routes
        app.use('/api/auth', authRoutes.router); // Use the auth routes

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