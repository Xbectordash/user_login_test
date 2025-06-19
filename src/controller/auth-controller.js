const { comparePassword } = require("../helper-functions/hash-password");
const users = require("../model/user-model");

const detectInputType = (input) => {
  if (/^[0-9]{10,15}$/.test(input)) {
    return "phone";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
    return "email";
  } else {
    return "username";
  }
};

const signInUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log(
      `Signing in user with Identifier: ${identifier}, Password: ${
        password ? "******" : "not provided"
      }`
    );

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "User input and password are required" });
    }

    const inputType = detectInputType(identifier); // e.g., 'email' or 'phone'

    const whereClause = {};
    whereClause[inputType] = identifier;

    const user = await users.findOne({ where: whereClause });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Optional: remove password before sending user data
    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signInUser;
