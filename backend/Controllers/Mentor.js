import Mentor from '../Model/MentorSchema.js';

import {jwtAuthMiddleware, generateToken } from  '../Middleware/jwt.js';

import dotenv from 'dotenv'
dotenv.config();

export const MentorSignup = async (req, res) => {
    try{
        const data = req.body // assuming the request body contain the User data
        // create a new user document using the mongoose model
        const newUser  = new Mentor(data);
        // save the new User to the database
        const response = await newUser.save()
        // message
        console.log('data saved');
    
        const payload = {
          userId: response.id
        }
        // console the payload
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : " , token);
    
        res.status(200).json({ response: response , token: token });
      }
      catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
      }
}

export const MentorSignin = async (req, res) => {
    try{
        // Extract username and password from request body
        const  {email, password} = req.body;
  
        // find the user by username
        const user = await Mentor.findOne({email : email});
  
        // if user not exist with that username  or password doesn't match
        if(!user || !(await user.comparePassword(password))){
              console.log("Invalid Email or Password");
              return res.status(401).json({error: 'Invalid Email or Password'});
        }
  
        // generate the token 
         const payload = {
           userId : user.id,
           role : "mentor",
         }
         const token = generateToken(payload);
  
         // retutn token as response
         res.json({ token, userId: user.id });

    }
    catch(err){
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
    }
}