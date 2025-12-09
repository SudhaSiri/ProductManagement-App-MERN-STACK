import User from "../models/User.js";
import { userRegisterSchema, userLoginSchema } from "../validators/userValidator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    const { error } = userRegisterSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.status = 400;
      throw error;
    }
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error("User already registered with this email!");
      err.status = 400;
      throw err;
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.status = 400;
      throw error;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Invalid email or password");
      err.status = 400;
      throw err;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.status = 400;
      throw err;
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

// UPDATE USER ROLE
export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) {
      const err = new Error("Invalid role value");
      err.status = 400;
      throw err;
    }
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!updatedUser) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    res.json({ message: "User role updated", user: updatedUser });
  } catch (err) {
    next(err);
  }
};
