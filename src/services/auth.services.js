import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

export const loginService = async function (email, password, ip, device) {
  const user = await User.findOne({ email });

  if (!user) throw new AppError("User not found!", 404);

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new AppError("Invalid credentials", 401);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

  user.sessions.push({
    token: hashedRefreshToken,
    ip,
    device,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  await user.save();

  return { accessToken, refreshToken };
};

export const refreshService = async function (refreshToken, ip, device) {
  if (!refreshToken) throw new AppError("No token", 401);

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
  } catch {
    throw new AppError("Invalid or expired token", 403);
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("user not found", 404);

  const session = await findMatchingSession(user.sessions, refreshToken);

  if (!session) {
    user.sessions = [];

    await user.save();
    throw new AppError("Token reuse detected.All sessions revoked", 403);
  }
  if (session.ip !== ip) {
    user.sessions = [];
    await user.save();
    throw new AppError("Suspicious activity detected", 403);
  }

  user.sessions = user.sessions.filter((s) => s._id.toString() !== session._id.toString());

  const newRefreshToken = generateRefreshToken(user);
  const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, 12);
  user.sessions.push({
    token: newHashedRefreshToken,
    ip,
    device,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  await user.save();

  const newAccessToken = generateAccessToken(user);

  return { newAccessToken, newRefreshToken };
};

async function findMatchingSession(sessions, refreshToken) {
  for (const session of sessions) {
    const matches = await bcrypt.compare(refreshToken, session.token);
    if (matches) return session;
  }

  return null;
}
