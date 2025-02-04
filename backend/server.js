import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';


// Import socket middleware and http
import { initializeSocket } from "./Middleware/socketio.js";
import http from "http";
const server = http.createServer(app); // HTTP server
// Initialize Socket.IO
initializeSocket(server);


// let's handle cors ..........
const corsOption = {
    origin :"http://localhost:3000",
    methods : "GET , POST , PUT , DELETE",
    credentials : true
}
app.use(cors(corsOption));


const PORT = process.env.PORT || 4000;
const murl = process.env.MONGODB_URL;

// console.log('MongoDB URL:', murl); // Debug line to check if the variable is loaded

import db  from './config/db.js';


import bodyParser from 'body-parser';
app.use(bodyParser.json());  // Parse JSON request body


import MentorRoute from './Routes/MentorRoutes.js';
app.use('/mentor' , MentorRoute);

import MenteeRoute from './Routes/MenteeRoutes.js';
app.use( '/mentee' , MenteeRoute);

import ChatRoutes from "./Routes/ChatRoutes.js";
app.use('/chat', ChatRoutes);


// Start the server (Only one listen call)
const SOCKETIO_PORT = PORT; // Use the same port for Socket.IO and Express
server.listen(SOCKETIO_PORT, () => {
    console.log(`Server running on port ${SOCKETIO_PORT}`);
});