import express from "express";
const router = express.Router();

import { suggestMentors } from "../Controllers/Matching.js";

router.get("/matching-mentor/:id", suggestMentors);

export default router;
