require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session')

const {registerUser, loginUser, getProfile, 
        postVideoInfo, getUserID, getNumVideos,
        getUserVideos, getVideoRankings, logoutUser} = require('./controllers/authController');
// const { registerUser } = require('./controllers/authController');

const PORT = process.env.SERVER_PORT || 3005;
const app = express();
app.use(json());

app.use(session( {
    secret: 'not so safe',
    resave: true,
    saveUninitialized: false
}));

//REGISTER USER ENDPOINT
app.post('/auth/register', registerUser)
//LOGIN USER ENDPOINT
app.post('/auth/login', loginUser)
//GET USER
app.get('/auth/user', getProfile)
//POST VIDEO INFO
app.post('/api/videos', postVideoInfo)
//GET SESSION USER ID
app.get('/api/user', getUserID)
//GET NUMBER OF VIDEOS
app.get('/api/videos', getNumVideos)
//GET VIDEOS OF A USER GIVEN THE USER
app.get('/api/videos/:user', getUserVideos)
//GET VIDEO RANKINGS
app.get('/api/rankings', getVideoRankings)
//LOGOUT
app.get('/auth/logout', logoutUser)


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));