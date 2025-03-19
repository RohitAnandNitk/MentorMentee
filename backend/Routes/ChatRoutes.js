import express from "express";
const router = express.Router();

import {
  getOrCreateChat,
  sendMessage,
  getAllChats,
} from "../Controllers/Chat.js";

// API to send a message
router.post("/send-message", sendMessage);
router.post("/get-or-create-chat", getOrCreateChat);
router.get("/get-all-chats/:id", getAllChats); // ✅ Using GET with query params

export default router;
