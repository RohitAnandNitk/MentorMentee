import express from "express";
const router = express.Router();

import {
  MentorSignup,
  MentorSignin,
  mentorDetails,
  getAllMentors,
  getTopMentors,
} from "../Controllers/Mentor.js";

router.post("/signup", MentorSignup);
router.post("/signin", MentorSignin);
router.get("/get-all-mentor", getAllMentors);
router.get("/get-top-mentor", getTopMentors);
router.get("/:id", mentorDetails);

export default router;
