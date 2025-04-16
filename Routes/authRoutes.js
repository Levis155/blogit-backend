import { Router } from "express";
import { validateEmailAndUsername } from "../middleware/validateEmailAndUsername.js";
import { registerUser, loginUser } from "../Controllers/authController.js";

const router = Router();

router.route("/register").post(validateEmailAndUsername, registerUser);
router.route("/login").post(loginUser);

export default router;
