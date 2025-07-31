import { createUser, validateUser } from "../services/authService.js";
import { generateToken } from "../utils/token.js";

// POST - handle register
// @public
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await createUser({ email, password });
    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST - handle login
// @public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await validateUser({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ userId: user._id, role: user.role });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
