// const { connectDB } = require('./database');

(async () => {
    // await connectDB(); // connection done here

    const { sequelize } = require('./database');
    sequelize.authenticate()
        .then(() => {
            console.log("✅ Database connection established successfully.");
        })
        .catch(err => {
            console.error("❌ Unable to connect to the database:", err);
            process.exit(1);
        });
    const [result] = await sequelize.query("SELECT NOW()");
    console.log("🕒 Time:", Object.values(result[0])[0]);
})();
///home/abhishek/Abhishek/user_login_test/