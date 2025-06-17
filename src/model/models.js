const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

console.log("📦 Defining userSignUp model...");
const userSignUp = sequelize.define('userSignUp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'userSignUp'
});
console.log("✅ userSignUp model defined.");

console.log("📦 Defining userLogin model...");
const userLogin = sequelize.define('userLogin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'userLogin'
});
console.log("✅ userLogin model defined.");

module.exports = {
    userSignUp,
    userLogin
};
