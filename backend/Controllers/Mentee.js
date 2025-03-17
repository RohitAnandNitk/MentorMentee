import Mentee from "../Model/MenteeSchema.js";

import { jwtAuthMiddleware, generateToken } from "../Middleware/jwt.js";

import dotenv from "dotenv";
dotenv.config();

export const MenteeSignup = async (req, res) => {
  try {
    const { name, email, password, bio, availability } = req.body;
    let skills = req.body.skills;

    // Ensure skills is an array (if sent as a string)
    if (typeof skills === "string") {
      skills = skills.split(",").map((skill) => skill.trim());
    }

    // ✅ Extract profile picture from `req.file`
    const image = req.file ? req.file.buffer.toString("base64") : null;

    console.log("Received Data:", {
      name,
      email,
      password,
      bio,
      skills,
      availability,
      image,
    });

    // Create new user
    const newUser = new Mentee({
      name,
      email,
      password,
      bio,
      availability,
      skills,
      image,
    });
    const response = await newUser.save();
    console.log("Data saved to DB");

    // Generate token
    const payload = { userId: response.id };
    const token = generateToken(payload);
    console.log("Token:", token);

    res.status(200).json({ response, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
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
    res.json({ token, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
