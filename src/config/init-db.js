const users = require("../model/user-model");
const { connectDB, ensureDatabaseExists } = require("./database");

const initDB = async () => {
  try {
    await ensureDatabaseExists(); // Step 1: Make sure DB exists
    console.log("✅ Database ensured successfully");
    await connectDB(); // Step 2: Connect to the DB
    console.log("✅ Database connection established successfully");
    console.log("🔗 Connecting to the database...");
    console.log("🔄 Syncing users model...");
    await users.sync();
    console.log("✅ users model synced.");

    console.log("🎯 All models synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing models:", error);
    throw error;
  }
};

module.exports = {
  initDB,
};
