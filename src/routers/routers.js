const express = require('express');
const { signUpUser} = require('../controller/auth');
const e = require('express');

const router = express.Router();
router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const user = await signUpUser(userData);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error("Error in signup route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.router = router;