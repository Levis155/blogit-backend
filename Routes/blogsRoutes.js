import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getallBlogsByUser, updateBlog } from "../Controllers/blogsController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = Router();

router.route("/").post(verifyUser, createBlog).get(verifyUser, getallBlogsByUser);
router.route("/:blogId").get(verifyUser, getBlog).patch(verifyUser, updateBlog).delete(verifyUser, deleteBlog);

export default router;