

const { userSignUp } = require('../model/models');

const signUpUser = async (userData) => {
    try {
        const user = await userSignUp.create(userData);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

exports.signUpUser = signUpUser;
