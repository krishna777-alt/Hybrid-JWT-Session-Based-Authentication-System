import bcrypt from "bcryptjs";

import User from "../models/User.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { loginService, refreshService } from "../services/auth.services.js";

export const register = async function (req, res) {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ status: 201, message: "User Registered", user });
};

export const login = asyncWrapper(async function (req, res) {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await loginService(
    email,
    password,
    req.ip,
    req.headers["user-agent"],
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.json({ accessToken });
});

export const refresh = asyncWrapper(async function (req, res) {
  const token = req.cookies.refreshToken;

  const { newAccessToken, newRefreshToken } = await refreshService(
    token,
    req.ip,
    req.headers["user-agent"],
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.json({ accessToken: newAccessToken });
});
