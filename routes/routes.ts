import express from "express";
import { home, signin, signup } from "../controller/authController";
import { getUserByToken } from "../controller/userController";

const router = express.Router();

router.route("/").get(home);
router.route("/auth/signup").post(signup);
router.route("/auth/signin").post(signin);
router.route("/users/:token").get(getUserByToken);

export default router;
