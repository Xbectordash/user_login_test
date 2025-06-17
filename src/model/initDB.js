const { userSignUp, userLogin } = require('./models');

const initDB = async () => {
    try {
        console.log("🔄 Syncing userSignUp model...");
        await userSignUp.sync();
        console.log("✅ userSignUp model synced.");

        console.log("🔄 Syncing userLogin model...");
        await userLogin.sync();
        console.log("✅ userLogin model synced.");

        console.log("🎯 All models synced successfully.");
    } catch (error) {
        console.error("❌ Error syncing models:", error);
        throw error;
    }
};

module.exports = {
    initDB
};
