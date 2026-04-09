import express from "express";
import { login, refresh, register } from "../contorllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refreshToken", refresh);

export default router;
