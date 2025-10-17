import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

export const registerUser = async (email, username, password) => {
  const existing = await User.findOne({ email });

  if (existing) throw new Error("User already exists");

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    profileImage,
  });

  const token = generateToken(user._id);

  return { token, user };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User do not exist");

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Incorrect password");

  const token = generateToken(user._id);
  return { token, user };
};

export const getProfile = async (userId) => {
  return await User.findById(userId);
};
