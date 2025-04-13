import { Router } from "express";
import { createBlog } from "../Controllers/blogsController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = Router();

router.route("/").post(verifyUser, createBlog)

export default router;