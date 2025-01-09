const mongoose = require('mongoose');

const MenteeSchema = new mongoose.Schema(
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
    fieldOfInterest: {
      type: [String], // Array of interests (e.g., "AI", "Web Development")
      default: [],
    },
    bio: {
      type: String,
      maxlength: 500, // Short description about the mentee
      default:"",
    },
    goals: {
      type: [String], // Specific goals (e.g., "Learn React", "Build a portfolio")
      default: [],
    },
    mentors: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Mentor IDs
        ref: 'Mentor',
      },
    ],
    
    profilePicture: {
      type: String, // URL or path to the profile picture
    },
    role: {
      type: String,
      default: 'mentee', // To differentiate between user types
    },  
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    feedbackGiven: {
      type: [
        {
          mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
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

module.exports = mongoose.model('Mentee', MenteeSchema);
