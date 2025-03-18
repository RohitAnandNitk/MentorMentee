import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import multer from "multer";
import bodyParser from "body-parser";
import db from "./config/db.js";
import MentorRoute from "./Routes/MentorRoutes.js";
import MenteeRoute from "./Routes/MenteeRoutes.js";
import ChatRoutes from "./Routes/ChatRoutes.js";
import { initializeSocket } from "./Middleware/socketio.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // HTTP server

// Initialize Socket.IO
initializeSocket(server);

// ✅ Fix CORS issue (Methods should be an array)
const corsOption = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOption));

// ✅ Fix: Proper Middleware for parsing request bodies
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// ✅ Fix: Use Multer for handling file uploads
const storage = multer.memoryStorage(); // Store in memory (or use disk storage)
const upload = multer({ storage: storage });
app.use(upload.single("image")); // Middleware to handle file uploads

// ✅ Route Setup
app.use("/mentor", MentorRoute);
app.use("/mentee", MenteeRoute);
app.use("/chat", ChatRoutes);

app.get("/api/chatbase-key", (req, res) => {
  res.json({ key: process.env.CHATBASE_SECRET_KEY });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
