import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = express.Router();
router;
router.get("/login", loginUser);
router.post("/register", registerUser);

export default router;
