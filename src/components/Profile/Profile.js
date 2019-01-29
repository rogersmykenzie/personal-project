import React, { Component } from 'react';
import axios from 'axios';
import {Paper, Input, Button, TextField} from '@material-ui/core';
import '../../styles/Profile.css'
import {storage} from '../../firebase'
import {connect} from 'react-redux';
import Sidebar from '../ProfileSidebar/ProfileSidebar'
import {Redirect} from 'react-router-dom'
import {changeProfilePicture} from '../../ducks/reducer'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';


class Profile extends Component {
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
            tags: '',
            redirect: false,
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
        toast('Uploading Video')
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
                                toast('Video Successfully Uploaded!')
                            })
                        })
                    })
                })
            });
        })
    }
    
    handleLogout = () => {
        this.props.changeProfilePicture('')
        axios.delete('/auth/logout').then(() => {
            this.setState({redirect: true})
        })
    }

    onToast = () => {
        // NotificationManager.success('Testing')
    }
    render() {

        return(
            <div className='profile-background'>
                {/* <NotificationContainer /> */}
                <ToastContainer />
                <Redirect to='/profile' />
                <div className='main-head-container'>
                    <Sidebar />
                    <img className='profile-picture-src' src={this.props.profilePicture} />
                    <Paper className='profile-head-bio'>
                            <p className='bio-text'>Bio: {this.props.bio}</p>
                            <Paper className='upload-paper'>
                                <label className='video-upload-label' for='video-upload-button'>SELECT VIDEO</label>
                                <Input id='video-upload-button' type='file' disableUnderline={true} onChange={(e) => this.setState({video: e.target.files[0]}) } ></Input>
                                <label className='thumbnail-upload-label' for='thumbnail-upload-button'>SELECT THUMBNAIL</label>
                                <Input id='thumbnail-upload-button' type='file' disableUnderline={true} onChange={(e) => this.setState({thumbnail: e.target.files[0]}) } >Upload</Input>
                                <TextField className='upload-field' variant='outlined' placeholder='Video Name' onChange={e => this.setState({videoTitle: e.target.value})} />
                                <TextField className='upload-field' variant='outlined' placeholder='Tags (e.g. tag1, tag2, tag3)' onChange={e => this.setState({tags: e.target.value})} />
                                <br />
                                <Button color='primary' variant='contained' onClick={() => this.handleFile()}>Upload</Button>
                            </Paper>
                        {this.state.redirect ? <Redirect to='/login' /> : null}
                    </Paper>
                </div>
                <div className='logout-container'>
                    <Button variant='contained' className='logout-button' onClick={() => this.handleLogout()}>Logout</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {changeProfilePicture})(Profile)