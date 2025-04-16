import { Router } from "express";
import {
  getUserInfo,
  updatePassword,
  updatePersonalInfo,
  updateProfileInfo,
  updateProfilePhoto,
} from "../Controllers/profileController.js";
import verifyUser from "../middleware/verifyUser.js";
import { validateEmailAndUsername } from "../middleware/validateEmailAndUsername.js";

const router = Router();

router.route("/").get(verifyUser, getUserInfo);
router
  .route("/update-personal-info")
  .patch([validateEmailAndUsername, verifyUser], updatePersonalInfo);
router.route("/update-profile-info").patch(verifyUser, updateProfileInfo);
router.route("/update-password").patch(verifyUser, updatePassword);
router.route("/update-profile-photo").patch(verifyUser, updateProfilePhoto);

export default router;
