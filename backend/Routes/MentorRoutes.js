import express from "express";
const router = express.Router();

import {
  MentorSignup,
  MentorSignin,
  mentorDetails,
} from "../Controllers/Mentor.js";

router.post("/signup", MentorSignup);
router.post("/signin", MentorSignin);
router.get("/:id", mentorDetails);

export default router;
