const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const {
    DB_NAME, DB_USER, DB_PASS,
    DB_HOST, DB_DIALECT, DB_LOGGING
} = process.env;

const createDB = (dbName) => {
    return new Sequelize(dbName, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: DB_LOGGING === 'true' ? console.log : false,
    });
};

const sequelize = createDB(DB_NAME);

const ensureDatabaseExists = async () => {
    try {
        const checkDb = createDB(''); // connect without db
        await checkDb.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        await checkDb.close();
        console.log(`✅ Database '${DB_NAME}' ensured.`);
    } catch (err) {
        console.error("❌ Failed to ensure DB:", err);
        process.exit(1);
    }
};

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Sequelize connected.");
    } catch (err) {
        console.error("❌ Sequelize connect failed:", err);
        process.exit(1);
    }
};

module.exports = {
    ensureDatabaseExists,
    connectDB,
    sequelize,
};
