import { registerUser } from "../services/authServices.js";

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
