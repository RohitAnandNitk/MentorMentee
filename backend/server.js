import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import multer from "multer";
import bodyParser from "body-parser";
import db from "./Config/db.js";
import MentorRoute from "./Routes/MentorRoutes.js";
import MenteeRoute from "./Routes/MenteeRoutes.js";
import ChatRoutes from "./Routes/ChatRoutes.js";
import { initializeSocket } from "./Middleware/socketio.js";
import MatchingRoutes from "./Routes/MatchingRoutes.js";
import ContactUsRoutes from "./Routes/ContactUsRoutes.js";
import RequestRoutes from "./Routes/RequestRoutes.js";
import cloudinary from "cloudinary";
dotenv.config();

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();
const server = http.createServer(app); // HTTP server

// ✅ Fix CORS issue (Methods should be an array)
const corsOption = {
  origin: ["http://localhost:3000", "https://mentor-mentee-tau.vercel.app"],

  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOption));

// Initialize Socket.IO
initializeSocket(server);

// ✅ Fix: Proper Middleware for parsing request bodies
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// ✅ Route Setup
app.use("/mentor", MentorRoute);
app.use("/mentee", MenteeRoute);
app.use("/chat", ChatRoutes);
app.use("/suggest", MatchingRoutes);
app.use("/contact", ContactUsRoutes);
app.use("/request", RequestRoutes);

app.get("/api/chatbase-key", (req, res) => {
  res.json({ key: process.env.CHATBASE_SECRET_KEY });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
