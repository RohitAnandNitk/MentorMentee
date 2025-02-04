import express from 'express';
const router = express.Router();


import { MenteeSignup , MenteeSignin } from '../Controllers/Mentee.js';

router.post('/signup' , MenteeSignup);
router.post('/signin' , MenteeSignin);


export default router;