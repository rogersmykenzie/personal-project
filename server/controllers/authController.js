const admin = require('firebase-admin')
const firebase = require('firebase');
const bcrypt = require('bcryptjs');
const serviceAccount = require('../resources/personal-project-88145-firebase-adminsdk-k7zzc-b2aec7c390.json');

var config = {
    apiKey: "AIzaSyDNrg2KprOIejrxR2Sm8zi5cHTu7yMAjyc",
    authDomain: "personal-project-88145.firebaseapp.com",
    databaseURL: "https://personal-project-88145.firebaseio.com",
    projectId: "personal-project-88145",
    storageBucket: "personal-project-88145.appspot.com",
    messagingSenderId: "1005159256004"
};
firebase.initializeApp(config);

module.exports = {
    registerUser: async (req, res, next) => {
        let numUsers = null
        let hash = await bcrypt.hash(req.body.password, 12)
            firebase.database().ref().once('value').then(response => {
                numUsers = response.val().users.length || 1;
            }).then(() => {
                firebase.database().ref('users/' + numUsers).set({
                    username: req.body.username,
                    password: hash,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    followers: 0,
                    following: 1,
                    profile_picture: req.body.profilePicture,
                    bio: "I'm a goon",
                    userID: numUsers
                }).then(response => {
                    req.session.username = req.body.username;
                    req.session.firstName = req.body.firstName;
                    req.session.lastName = req.body.lastName;
                    req.session.email = req.body.email;
                    req.session.followers = req.body.followers;
                    req.session.following = req.body.following;
                    req.session.profilePicture = req.body.profilePicture;
                    req.session.bio = req.body.bio;
                    req.session.id = numUsers;
                    res.status(200).json({});
                })
            })
        },


    loginUser: async (req, res, next) => {
        firebase.database().ref('/users').once('value').then(response => {
            let arr = response.val(); //array of objects
            let index = -1;
            for(let i = 1; i < arr.length; i++) {
                if(arr[i].username === req.body.username)
                index = i;
            }
            if(index === -1) {
                res.status(401).json({error: 'Incorrect Username'});
                console.log('Username not found');
            } else {
                bcrypt.compare(req.body.password, arr[index].password)
                .then(response => {
                    if(!response) {
                        res.status(401).json({error: 'Incorrect Password'})
                        console.log('Incorrect Password');
                    }
                    else {
                        req.session.username = arr[index].username;
                        req.session.firstName = arr[index].first_name;
                        req.session.lastName = arr[index].last_name;
                        req.session.followers = arr[index].followers;
                        req.session.following = arr[index].following;
                        req.session.email = arr[index].email;
                        req.session.profilePicture = arr[index].profile_picture
                        req.session.bio = arr[index].bio
                        req.session.userID = index
                        console.log('Authenticated')
                        console.log(req.session);
                        res.status(200).json({profilePicture: req.session.profilePicture});
                    }
                })
            }
    
        })
    },



    getProfile: (req, res, next) => {
        if(req.session.profilePicture)
        res.status(200).json({profilePicture: req.session.profilePicture, bio: req.session.bio, id: req.session.userID});
    },
    
    
    
    postVideoInfo: (req, res, next) => {
        firebase.database().ref().once('value').then(response => {
            let numVideos = response.val().videos.length
            // console.log(response.val())
            firebase.database().ref(`videos/${numVideos}`).set({
                title: req.body.title,
                videoID: 1,
                reference: req.body.reference,
                interactions: 0,
                thumbnailID: req.body.thumbnailID,
                userID: req.body.userID,
                tags: req.body.tags,
                votes: 0
            }).then(response => {
                res.sendStatus(200);
            })
        })
    },



    getUserID: (req, res, next) => {
        if(req.session.userID) {
            res.status(200).json(req.session.userID);
        } else
            res.sendStatus(418)

    },



    getNumVideos: (req, res, next) => {
        firebase.database().ref().once('value').then(response => {
            console.log('numvideos: ',response.val().videos.length - 1);
            res.status(200).json(response.val().videos.length - 1);
        })
    },



    getUserVideos: (req, res, next) => {
        firebase.database().ref('videos').once('value').then(response => {
            let userVideos = []
            for(let i = 1; i <= response.val().length-1; i++) {
                if(+response.val()[i].userID === +req.params.user) {
                    userVideos.push({
                        thumbnail: response.val()[i].thumbnailID,
                        video: response.val()[i].reference
                    })
                }
            }
            if(userVideos.length === 0)
                res.status(409).json({error: 'No Videos Found'});
            else {
                console.log(userVideos)
                res.status(200).json(userVideos);
            }
        })
    },



    getVideoRankings: (req, res, next) => {
        firebase.database().ref('videos').once('value').then(response => {
            let videos = [...response.val()];
            videos.splice(0, 1);
            videos.sort((a, b) => {
                if(a.votes < b.votes)
                    return -1
                else if(a.votes > b.votes)
                    return 1
                return 0
            })
            res.status(200).json(videos);
        })
    },



    logoutUser: (req, res, next) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}