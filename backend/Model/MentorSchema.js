import mongoose from 'mongoose';
import bcrypt from "bcrypt";

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
      default : "",
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

// bcrypt 
MentorSchema.pre('save' , async function(next){
  const user = this;
  
  // hash the password only if it has been  modified 
  if(!user.isModified('password')) return next();
  
  try{
     // hash password generation
           const salt = await  bcrypt.genSalt(10); //complexity of salt is depend upon the vlaue of genSalt.
           
           // hash password
           const hashedPassword = await  bcrypt.hash(user.password , salt);
           
           user.password = hashedPassword;
           
           next();
       }
       catch(err){
           return next(err);   
       }
   });
   
   
   
// comparing the password
MentorSchema.methods.comparePassword = async function(candidatePassword){
try{
   // use bcrypt to campare the  provided password with the hashed password
   const isMatch = await bcrypt.compare(candidatePassword, this.password);
   return isMatch;
}
catch(err){
   throw err;
}
};


const Mentor =  mongoose.model('Mentor', MentorSchema);
export default Mentor;