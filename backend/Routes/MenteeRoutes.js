import express from "express";
const router = express.Router();

import {
  MenteeSignup,
  MenteeSignin,
  menteeDetails,
} from "../Controllers/Mentee.js";

router.post("/signup", MenteeSignup);
router.post("/signin", MenteeSignin);
router.get("/:id", menteeDetails);

export default router;
