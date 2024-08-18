import express from "express";
import { home, signup } from "../controller";

const router = express.Router();

router.route("/").get(home);
router.route("/auth/signup").post(signup);

export default router;
