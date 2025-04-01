import express from "express";
const router = express.Router();

import {
  MentorSignup,
  MentorSignin,
  mentorDetails,
  getAllMentors,
  getTopMentors,
  updateProfile,
  updateProfilePic,
} from "../Controllers/Mentor.js";
import { singleUpload } from "../Middleware/multer.js";

router.post("/signup", singleUpload, MentorSignup);
router.post("/signin", MentorSignin);
router.get("/get-all-mentor", getAllMentors);
router.get("/get-top-mentor", getTopMentors);
router.get("/:id", mentorDetails);
router.put("/update-profile/:id", updateProfile);
router.put("/update-profile-pic/:id", singleUpload, updateProfilePic);

export default router;
