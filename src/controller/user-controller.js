const users = require("../model/user-model");
const { hashPassword } = require("../helper-functions/hash-password");
const { Op } = require("sequelize");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    return res
      .status(201)
      .json({ message: "Get all user  successfully", allUsers });
  } catch (err) {
    return res.status(400).json({ error: "Invalid input" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    return res.status(400).json({ error: "Invalid input" });
  }
};
const creatingUser = async (data) => {
  console.log("Creating user with data:", data);
  const { username, phone, email, password, address } = data;

  const pass = await hashPassword(password);
  const user = await users.create({
    username,
    phone,
    email,
    password: pass,
    address,
  }, {
    individualHooks: true,
  });
  return user;
};

const createUser = async (req, res) => {
  try {
    const exist = await users.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    let oneUsers;
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      oneUsers = await creatingUser(req.body);
    }


    return res
      .status(201)
      .json({ message: "User created successfully", oneUsers });
  } catch (err) {
    return res.status(400).json({ error: "Invalid input" });
  }
};
const createBulkUsers = async (req, res) => {
  try {
    const duplicateUsers = [];
    const uniqueUsers = [];

    for (const user of req.body) {
      // Check if user already exists
      const existingUser = await users.findOne({
        where: {
          [Op.or]: [{ email: user.email }, { phone: user.phone }],
        },
      });

      if (existingUser) {
        duplicateUsers.push(user);
      } else {
        // Hash password
        user.password = await hashPassword(user.password);
        uniqueUsers.push(user);
      }
    }

    const alluUers = await users.bulkCreate(uniqueUsers, {
      individualHooks: true,
    });

    return res.status(201).json({
      message: "Bulk users created",
      alluUers,
    });
  } catch (error) {
    console.error("Bulk insert error:", error);
    return res.status(500).json({
      message: "Failed to create users",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, phone, email, password, address } = req.body;
  console.log("Updating user with ID:", id);
  console.log("Update data:", req.body);
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    if (!username && !phone && !email && !password && !address) {
      return res.status(400).json({ message: "No fields to update" });
    }
    const user = await users.findByPk(id);


    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    console.log("User found:", user);

    if (password) {
      user.password = await hashPassword(password) ?? user.password;
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.address = address ?? user.address;

    await user.save();

    return res.status(200).json({ message: "User updated", user });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await user.destroy();

    return res.status(201).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  createBulkUsers,
  updateUser,
  deleteUser,
};
