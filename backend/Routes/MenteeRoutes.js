import express from "express";
const router = express.Router();

import {
  MenteeSignup,
  MenteeSignin,
  menteeDetails,
  updateProfile,
} from "../Controllers/Mentee.js";

router.post("/signup", MenteeSignup);
router.post("/signin", MenteeSignin);
router.get("/:id", menteeDetails);
router.put("/update-profile/:id", updateProfile);

export default router;
