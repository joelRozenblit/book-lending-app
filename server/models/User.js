import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  booksBorrowed: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("User", userSchema);
