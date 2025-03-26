import Mentor from "../Model/MentorSchema.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../Utils/Features.js";
import { jwtAuthMiddleware, generateToken } from "../Middleware/jwt.js";

import dotenv from "dotenv";
dotenv.config();

export const MentorSignup = async (req, res) => {
  console.log("Call for signup at backend");
  try {
    const { name, email, password, bio, availability } = req.body;
    let expertise = req.body.skills;

    // Ensure skills is an array (if sent as a string)
    if (typeof expertise === "string") {
      expertise = expertise.split(",").map((skill) => skill.trim());
    }

    // validation of file
    if (!req.file) {
      return res.status(500).json({
        success: false,
        message: "please upload the product image",
      });
    }
    //handle mentor image
    console.log("hiiiii");
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const pic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    console.log("Received Data:", {
      name,
      email,
      password,
      bio,
      expertise,
      availability,
    });

    // Create new user
    const newUser = new Mentor({
      name,
      email,
      password,
      bio,
      availability,
      expertise,
      profilePicture: [pic],
    });
    const response = await newUser.save();
    // message
    console.log("data saved");

    const payload = {
      userId: response.id,
    };
    // console the payload
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const MentorSignin = async (req, res) => {
  try {
    // Extract username and password from request body
    const { email, password } = req.body;

    // find the user by username
    const user = await Mentor.findOne({ email: email });

    // if user not exist with that username  or password doesn't match
    if (!user || !(await user.comparePassword(password))) {
      console.log("Invalid Email or Password");
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    // generate the token
    const payload = {
      userId: user.id,
      role: "mentor",
    };
    const token = generateToken(payload);

    // retutn token as response
    res.json({ token, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const mentorDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    // Corrected: Await the database query
    const data = await Mentor.findById(userId);

    // If mentee not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    console.log("Data:", data);

    res.status(200).json({
      success: true,
      message: "Mentor data fetched successfully",
      data,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error in fetch mentor details API" });
  }
};

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({});
    res.status(200).json({
      success: true,
      message: "All mentors data fetched successfully!",
      mentors,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error in fetch  all mentor  API" });
  }
};

export const getTopMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({}).sort({ ratings: -1 }).limit(3);
    res.status(200).json({
      success: true,
      message: "Top 3 mentors",
      mentors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Get TOP mentor API",
      error,
    });
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
    let expertise = req.body.skills;

    // Ensure skills is an array (if sent as a string)
    if (typeof expertise === "string") {
      expertise = expertise.split(",").map((skill) => skill.trim());
    }

    // ✅ Extract profile picture from `req.file`
    const image = req.file ? req.file.buffer.toString("base64") : null;

    // Corrected: Await the database query
    const data = await Mentor.findById(userId);
    // If mentee not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    //update info
    data.name = name;
    data.email = email;
    data.bio = bio;
    data.availability = availability;
    data.expertise = expertise;
    data.image = image;

    // console.log("Data:", data);
    await data.save();
    console.log("Mentor profile updated successfully");

    res.status(200).json({
      success: true,
      message: "Mentor profile updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error at update profile mentor API",
      error,
    });
  }
};
