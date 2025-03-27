import express from "express";
import { createContactUs } from "../Controllers/ContactUs.js";
const router = express.Router();

router.post("/send-query", createContactUs);

export default router;
