import express from "express";
const router = express.Router();

import {
  MenteeSignup,
  MenteeSignin,
  menteeDetails,
  updateProfile,
  getAllMentee,
} from "../Controllers/Mentee.js";
import { singleUpload } from "../Middleware/multer.js";

router.get("/get-all-mentee", getAllMentee);
router.post("/signup", singleUpload, MenteeSignup);
router.post("/signin", MenteeSignin);
router.get("/:id", menteeDetails);
router.put("/update-profile/:id", updateProfile);

export default router;
