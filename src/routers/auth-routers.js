const express = require("express");
const signInUser = require("../controller/auth-controller");
const {createUser} = require("../controller/user-controller");

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signInUser);
module.exports = router;
