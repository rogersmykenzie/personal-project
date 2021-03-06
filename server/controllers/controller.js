const firebase = require('firebase');
const bcrypt = require('bcryptjs');
firebase.initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
});
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
                        res.status(200).json({profilePicture: req.session.profilePicture, bio: req.session.bio});
                    }
                })
            }
    
        })
    },



    getCurrentUser: (req, res, next) => {
        console.log(req.session.username !== undefined)
        if(req.session.username !== undefined) {
            let obj = {
                username: req.session.username,
                firstName: req.session.firstName,
                lastName: req.session.lastName,
                followers: req.session.followers,
                following: req.session.following,
                email: req.session.email,
                profilePicture: req.session.profilePicture,
                bio: req.session.bio,
                userID: req.session.userID
            }
            res.status(200).json(obj);
        }
        else {
            res.sendStatus(400)
        }
    },



    getProfile: (req, res, next) => {
        if(req.session.profilePicture)
        res.status(200).json({profilePicture: req.session.profilePicture, bio: req.session.bio, id: req.session.userID});
    },
    
    
    //UPDATE THIS SO THAT IT POST THE VIDEO TO THE DATABASE WITH AN ID OF THE HIGHEST ID + 1 USE MATH.MAX
    postVideoInfo: (req, res, next) => {
        firebase.database().ref().once('value').then(response => {
            // console.log(response.val());
            // let arrOfVideoIDs = [];
            // console.log(response.val().videos.length)
            // for(let i = 1; i < response.val().videos.length; i++) {
            //     console.log(response.val().videos[i])
            //     if(response.val().videos[i]);
            //         console.log(response.val().videos[i])
            //         arrOfVideoIDs.push({id: response.val().videos[i].videoID, index: i});
            // }
            // arrOfVideoIDs.sort((a, b) => {
            //     if(a.id < b.id)
            //         return 1
            //     if(a.id > b.id)
            //         return -1
            //     return 0
            // })
            let numVideos = response.val().videos.length
            // console.log(response.val().videos.length);
            firebase.database().ref(`videos/${numVideos}`).set({
                title: req.body.title,
                videoID: numVideos,
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
            console.log(response.val());
            for(let i = 1; i <= response.val().length-1; i++) {
                if(response.val()[i]) {
                    if(+response.val()[i].userID === +req.params.user) {
                        userVideos.push({
                            thumbnail: response.val()[i].thumbnailID,
                            video: response.val()[i].reference,
                            videoID: response.val()[i].videoID,
                            votes: response.val()[i].votes,
                            title: response.val()[i].title
                        })
                    }
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
            let videos = response.val();
            videos.splice(0, 1);
            for(let i = videos.length; i >= 0; i--) {
                if(!videos[i])
                    videos.splice(i,1);
            }
            videos.sort((a, b) => {
                if(a.votes < b.votes)
                    return 1
                else if(a.votes > b.votes)
                    return -1
                return 0
            })
            res.status(200).json(videos);
        })
    },



    logoutUser: (req, res, next) => {
        req.session.destroy();
        res.sendStatus(200);
    },



    getRandomVideos: (req, res, next) => {
        firebase.database().ref('videos').once('value').then(response => {
            let videoArr = response.val().slice();
            for(let i = videoArr.length; i >= 0; i--) {
                if(!videoArr[i]) {
                    videoArr.splice(i,1);
                }
            }
            let length = videoArr.length;
            let randomVideoIndex1 = Math.floor(((Math.random() * 10) % (length-1)) + 1)
            let randomVideoIndex2 = randomVideoIndex1;
            while(randomVideoIndex2 === randomVideoIndex1) {
                randomVideoIndex2 = Math.floor(((Math.random() * 10) % (length-1)) + 1)
            }

            res.status(200).json({video1: videoArr[randomVideoIndex1], video2: videoArr[randomVideoIndex2]})
        })
    },



    videoVote: (req, res, next) => {
        firebase.database().ref(`videos`).once('value').then(response => {
            let numVotes = response.val()[+req.body.videoID].votes;
            firebase.database().ref('videos').child(+req.body.videoID).update({votes: numVotes + 1}).then(response => {
                res.status(200).json('hehe')
            })
        })
    },
    //JOIN STATEMENT ^^



    searchVideos: (req, res, next) => {
        let arr = req.query.search.split(' ');
        console.log(arr);
        let indexOfVideosWhoseTagsMatchTheQuery = [];
        firebase.database().ref('videos').once('value').then(response => {
            for(let i = 1; i < response.val().length; i++) {
                if(response.val()[i]) {
                    let tags = response.val()[i].tags.split(',').map((val, i, arr) => {
                        return val.toLowerCase().trim();
                    })
                    console.log(tags)
                    for(let c = 0; c < arr.length; c++) {
                        if(tags.includes(arr[c].toLowerCase()) ) {
                            console.log('here')
                            indexOfVideosWhoseTagsMatchTheQuery.push(i);
                        }
                    }
                }
            }
            let finalIndexArr = indexOfVideosWhoseTagsMatchTheQuery.filter((val, i, arr) => {
                return indexOfVideosWhoseTagsMatchTheQuery.indexOf(val) === i
            })
            let jsonArr = []
            for(let i = 0; i < finalIndexArr.length; i++) {
                jsonArr.push(response.val()[finalIndexArr[i]]);
            }
            res.status(200).json(jsonArr);
        })
    },



    getUsersBasedOnVideos: (req, res, next) => {
        firebase.database().ref('users').once('value').then(response => {
            let arr = response.val().slice().splice(1);
            let orderedUsers = [];
            console.log(req.body)
            for(let i = 0; i < req.body.videos.length; i++) {
                let element = req.body.videos[i];
                let index = arr.findIndex((val, i, arr) => val.userID === element.userID)
                orderedUsers.push(arr[index]);
            }
            res.status(200).json(orderedUsers);
        })
    },



    getSingleVideo: (req, res, next) => {
        firebase.database().ref('videos').once('value').then(response => {
            let arr = response.val().slice();
            for(let i = arr.length; i >= 0; i--) {
                if(!arr[i])
                    arr.splice(i,1);
            }
            let index = arr.findIndex((val, i, arr) => +val.videoID === +req.params.id)
            res.status(200).json(arr[index]);
        })
    },



    getTotalVideoVotes: (req, res, next) => {
        firebase.database().ref('videos').once('value').then(response => {
            let votes = response.val().splice(1).reduce((acc, elem) => acc + elem.votes, 0)
            res.status(200).json(votes);
        })
    },



    deleteVideo: (req, res, next) => {
        firebase.database().ref(`videos/${req.params.id}`).set({
            interactions: null,
            reference: null,
            tags: null,
            thumbnail: null,
            title: null,
            userID: null,
            videoID: null,
            votes: null
        })

        res.sendStatus(200);
    }
}