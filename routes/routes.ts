import express from "express";
import { home } from "../controller";

const router = express.Router();

router.route("/").get(home);

export default router;
