import express from 'express';
const router = express.Router();


import { MentorSignup , MentorSignin } from '../Controllers/Mentor.js';

router.post('/signup' , MentorSignup);
router.post('/signin' , MentorSignin);


export default router;