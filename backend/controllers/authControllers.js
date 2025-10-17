import {
  getProfile,
  loginUser,
  registerUser,
} from "../services/authServices.js";

export const registerUserController = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields are required" });
  }

  if (email < 6) {
    return res
      .status(400)
      .json({ message: "Email used be more than 6 characters" });
  }

  if (username < 3) {
    return res
      .status(400)
      .json({ message: "Username should be more than 3 characters" });
  }

  try {
    const { token, user } = await registerUser(email, username, password);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields are required" });
  }

  if (password < 6) {
    return res
      .status(400)
      .json({ message: "Password length should be more than 6 characters" });
  }

  try {
    const { token, user } = await loginUser(email, password);

    const tokenizedUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    };

    res.status(200).json({ message: "User logged in", token, tokenizedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileController = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }
    const user = await getProfile(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
