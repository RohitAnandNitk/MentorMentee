import mongoose from 'mongoose';
import bcrypt from "bcrypt";


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
      default : ""
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



// bcrypt 
MenteeSchema.pre('save' , async function(next){
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
MenteeSchema.methods.comparePassword = async function(candidatePassword){
try{
   // use bcrypt to campare the  provided password with the hashed password
   const isMatch = await bcrypt.compare(candidatePassword, this.password);
   return isMatch;
}
catch(err){
   throw err;
}
};



const Mentee = mongoose.model('Mentee', MenteeSchema);
export  default Mentee;
