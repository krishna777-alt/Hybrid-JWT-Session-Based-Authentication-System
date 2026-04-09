import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  token: String,
  device: String,
  ip: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  sessions: [sessionSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
