import express from "express";
import { home, signin, signup } from "../controller/authController";
import { getUserByToken } from "../controller/userController";
import {
  getProjectMembers,
  getUserProjects,
} from "../controller/projectController";

const router = express.Router();

router.route("/").get(home);
router.route("/auth/signup").post(signup);
router.route("/auth/signin").post(signin);
router.route("/users/:token").get(getUserByToken);
router.route("/projects/user/:userid").get(getUserProjects);
router.route("/members/project/:projectid").get(getProjectMembers);

export default router;
