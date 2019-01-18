import React, { Component } from 'react';
import axios from 'axios';
import {Paper, Typography, Input, Button, TextField} from '@material-ui/core';
import '../../styles/Profile.css'
import {storage} from '../../firebase'
import Sidebar from '../ProfileSidebar/ProfileSidebar'

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            profilePicture: null,
            bio: '',
            video: null,
            uploading: false,
            videoTitle: '',
            thumbnail: null,
            id: -1,
            tags: ''
        }
    }

    componentWillMount() {
        axios.get('/auth/user')
        .then(response => {
            console.log(response.data.id);
            this.setState({profilePicture: response.data.profilePicture, bio: response.data.bio, id: response.data.id});
        })
    }

    handleFile = () => {
        axios.get('/api/videos')
        .then(response => {
            let num = response.data + 1;
            console.log(num)
            const upload = storage.ref(`videos/battle/${num}`).put(this.state.video)
            upload.on('state_changed', ()=>null, (err)=>console.log(err), ()=>{
                storage.ref(`videos/battle/${num}`).getDownloadURL().then(videoURL => {
                    console.log(this.state.thumbnail);
                    const thumbnail = storage.ref(`images/thumbnails/${num}`).put(this.state.thumbnail)
                    thumbnail.on('state_changed', ()=>null, (err)=>console.log(err), ()=> {
                        storage.ref(`images/thumbnails/${num}`).getDownloadURL().then(thumbnailURL => {
                            console.log('heres')
                            let obj = {
                                title: this.state.videoTitle,
                                reference: videoURL,
                                userID: this.state.id,
                                thumbnailID: thumbnailURL,
                                tags: this.state.tags
                            }
                            axios.post('/api/videos', obj)
                            .then(response => {
                                console.log(response.status)
                            })
                        })
                    })
                })
            });
        })
    }
    
    render() {
        return(
            <div><br /><br /><br /><br />
                <Paper className='main-head-container'>
                    <Sidebar />
                    <img className='profile-picture-src' src={'https://firebasestorage.googleapis.com/v0/b/personal-project-88145.appspot.com/o/images%2Fprofile%2Fmrogers?alt=media&token=6e160175-84e5-4441-a9c0-08156b679191'} />
                    <Paper className='profile-head-bio'>
                        <Typography variant='h6'>
                            <p className='bio-text'>Bio: {this.state.bio}</p>
                            <Input type='file' disableUnderline={true} onChange={(e) => this.setState({video: e.target.files[0]}) } >Upload</Input>
                            <Input type='file' disableUnderline={true} onChange={(e) => this.setState({thumbnail: e.target.files[0]}) } >Upload</Input>
                            <TextField variant='outlined' placeholder='Video Name' onChange={e => this.setState({videoTitle: e.target.value})} />
                            <TextField variant='outlined' placeholder='Tags' onChange={e => this.setState({tags: e.target.value})} />
                            <Button color='primary' variant='contained' onClick={() => this.handleFile()}>Upload</Button>
                        </Typography>
                    </Paper>
                </Paper>
            </div>
        )
    }
}