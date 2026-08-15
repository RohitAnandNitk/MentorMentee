import Mentee from "../Model/MenteeSchema.js";
import { getDataUri } from "../Utils/Features.js";

import { jwtAuthMiddleware, generateToken } from "../Middleware/jwt.js";

import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();

export const MenteeSignup = async (req, res) => {
  console.log("Call for mentee signup at backend");
  try {
    const { name, email, password, bio, availability } = req.body;
    let fieldOfInterest = req.body.fieldOfInterest || req.body.skills;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check duplicate user
    const existingMentee = await Mentee.findOne({ email: email.toLowerCase() });
    if (existingMentee) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered as a mentee",
      });
    }

    // Ensure skills is an array (if sent as a string)
    if (typeof fieldOfInterest === "string") {
      fieldOfInterest = fieldOfInterest.split(",").map((skill) => skill.trim()).filter(Boolean);
    }

    let pic = {
      public_id: "",
      url: "https://via.placeholder.com/150",
    };

    // handle image upload if provided
    if (req.file) {
      try {
        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        pic = {
          public_id: cdb.public_id,
          url: cdb.secure_url,
        };
      } catch (uploadErr) {
        console.error("Cloudinary upload failed, using fallback picture:", uploadErr.message);
      }
    }

    // Create new user
    const newUser = new Mentee({
      name,
      email,
      password,
      bio,
      availability: availability || "Available",
      fieldOfInterest: fieldOfInterest || [],
      profilePicture: [pic],
    });
    const response = await newUser.save();
    console.log("Mentee data saved successfully");

    res.status(200).json({
      success: true,
      message: "Register successfully",
      response,
    });
  } catch (err) {
    console.error("Error in MenteeSignup:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Error during mentee signup",
    });
  }
};

export const MenteeSignin = async (req, res) => {
  try {
    // Extract username and password from request body
    const { email, password } = req.body;

    // find the user by username
    const user = await Mentee.findOne({ email: email });

    // if user not exist with that username  or password doesn't match
    if (!user || !(await user.comparePassword(password))) {
      console.log("Invalid Email or Password");
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    // generate the token
    const payload = {
      userId: user.id,
      role: "mentee",
    };

    const token = generateToken(payload);

    // retutn token as response
    console.log("mentee login with id : ", user.id);
    res.json({ token, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const menteeDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    // Corrected: Await the database query
    const data = await Mentee.findById(userId);

    // If mentee not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mentee not found",
      });
    }

    console.log("Data:", data);

    res.status(200).json({
      success: true,
      message: "Mentee data fetched successfully",
      data,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error in fetch mentee details API" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const { name, email, bio, availability } = req.body;
    let fieldOfInterest = req.body.fieldOfInterest || req.body.skills || [];

    // Ensure fieldOfInterest is an array (if sent as a string)
    if (typeof fieldOfInterest === "string") {
      fieldOfInterest = fieldOfInterest.split(",").map((skill) => skill.trim()).filter(Boolean);
    }

    // Corrected: Await the database query
    const data = await Mentee.findById(userId);
    // If mentee not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mentee not found",
      });
    }

    //update info
    if (name) data.name = name;
    if (email) data.email = email;
    if (bio !== undefined) data.bio = bio;
    if (availability) data.availability = availability;
    if (fieldOfInterest && fieldOfInterest.length > 0) data.fieldOfInterest = fieldOfInterest;

    // console.log("Data:", data);
    await data.save();

    res.status(200).json({
      success: true,
      message: "Mentee profile updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error at mentee update profile.",
    });
  }
};

export const getAllMentee = async (req, res) => {
  try {
    const mentees = await Mentee.find({});
    res.status(200).json({
      success: true,
      message: "All mentees data fetched successfully!",
      mentees,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error in fetch  all mentee  API" });
  }
};
