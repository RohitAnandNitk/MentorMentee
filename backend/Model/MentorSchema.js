const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    expertise: {
      type: [String], // Array of expertise fields (e.g., "Web Development", "Data Science")
      default: [],
    },
    bio: {
      type: String,
      maxlength: 500, // Short description about the mentor
      default: ""
    },
    
    availability: {
      type: String, // Options: "Available", "Busy", "Not Available"
      default: "Available",
    },
    schedule: {
      type: Array, // Array of objects to store time slots
      default: [],
    },
    mentees: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Mentee IDs
        ref: 'Mentee',
      },
    ],
    role: {
      type: String,
      default: 'mentor', // To differentiate between user types
    },
    profilePicture: {
      type: String, // URL or path to the profile picture
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    ratings: {
      type: [
        {
          menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentee' },
          rating: { type: Number, min: 1, max: 5 },
          feedback: { type: String, maxlength: 300 },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Mentor', MentorSchema);
