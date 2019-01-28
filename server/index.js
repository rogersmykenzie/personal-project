require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session')

const {registerUser, loginUser, getProfile, 
    postVideoInfo, getUserID, getNumVideos,
    getUserVideos, getVideoRankings, logoutUser,
    getRandomVideos, videoVote, searchVideos,
    getUsersBasedOnVideos, getSingleVideo,
    getTotalVideoVotes, deleteVideo, getCurrentUser} = require('./controllers/authController');
// const { registerUser } = require('./controllers/authController');

const PORT = process.env.SERVER_PORT || 3005;
const app = express();
app.use(json());

app.use(session( {
    secret: 'not so safe',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));

//REGISTER USER ENDPOINT
app.post('/auth/register', registerUser)
//LOGIN USER ENDPOINT
app.post('/auth/login', loginUser)
//CHECK FOR A USER ON THE SESSION
app.get('/auth/current', getCurrentUser)
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
app.delete('/auth/logout', logoutUser)
//GET RANDOM VIDEO
app.get('/api/video/random', getRandomVideos)
//VOTE FOR A VIDEO
app.put('/api/video/vote', videoVote)
//GET SEARCH RESULTS
app.get('/api/search', searchVideos)
//GET USERS BASED ON VIDEOS
app.post('/api/users', getUsersBasedOnVideos)
//GET SPECIFIC VIDEO
app.get('/api/search/video/:id', getSingleVideo)
//GET ALL VIDEOS
app.get('/api/all/votes', getTotalVideoVotes)
//DELETE VIDEO
app.delete('/api/videos/:id', deleteVideo)


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));