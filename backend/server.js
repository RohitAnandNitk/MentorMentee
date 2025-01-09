const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');

// let's hanle cors ..........

const corsOption = {
    origin :["http://localhost:3000", "https://satkar-restaurant.vercel.app"],
    methods : "GET , POST , PUT , DELETE",
    credentials : true
}
app.use(cors(corsOption));


const PORT = process.env.PORT || 4000;
const murl = process.env.MONGODB_URL;

console.log('MongoDB URL:', murl); // Debug line to check if the variable is loaded

const db = require('./config/db');


const bodyParser = require('body-parser');
app.use(bodyParser.json());  // Parse JSON request body


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});