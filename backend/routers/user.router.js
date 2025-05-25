import express from "express";
import { register, signin } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/sign-in").post(signin)

export default router