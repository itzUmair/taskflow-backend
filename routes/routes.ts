import express from "express";
import { home, signin, signup } from "../controller";

const router = express.Router();

router.route("/").get(home);
router.route("/auth/signup").post(signup);
router.route("/auth/signin").post(signin);

export default router;
