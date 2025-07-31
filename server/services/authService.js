import User from "../models/User.js";
import bcrypt from "bcrypt";

// register helper:
// hash the password - create user - save
export const createUser = async ({ email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashed });
  return await newUser.save();
};

// login helper:
// search by email - check password
export const validateUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const match = bcrypt.compare(password, user.password);
  return match ? user : null;
};
