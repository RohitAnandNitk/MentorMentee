import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

// Force IPv4 DNS resolution first to prevent ENOTFOUND / SRV lookup issues in Node.js 18+ on Render
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

// Configure dotenv (local dev fallback)
dotenv.config({ path: "./Config/.env" });
dotenv.config();

const mongoURL = process.env.MONGODB_URL || process.env.MONGODB_URI;

if (!mongoURL) {
  console.error("❌ CRITICAL ERROR: Neither MONGODB_URL nor MONGODB_URI environment variable is set.");
} else {
  // Setup MongoDB connection
  mongoose.connect(mongoURL).catch((err) => {
    console.error("❌ MongoDB initial connection error:", err.message);
  });
}

// Get default connection object
export const db = mongoose.connection;

// Event listeners
db.on("connected", () => {
  console.log("✅ Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("❌ MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

export default db;
