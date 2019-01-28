import React, {Component} from 'react'

import Sidebar from '../ProfileSidebar/ProfileSidebar'
import {Paper} from '@material-ui/core'
import axios from 'axios';
import '../../styles/ProfileVideos.css';
import {Link} from 'react-router-dom'
import ProfileVideoSlot from '../ProfileVideoSlot/ProfileVideoSlot'

export default class ProfileVideos extends Component {
    constructor() {
        super()
        this.state = {
            userVideos: [],
            toggleDeletePrompt: false
        }
    }

    componentDidMount() {
        axios.get('/api/user')
        .then(response => {
            let userID = response.data;
            console.log('userid: ', userID)
            axios.get(`/api/videos/${userID}`).then(response => {
                this.setState({userVideos: [...response.data]})
            })
        })
    }

    render() {
        let videos = 'You have not uploaded any videos yet, grasshopper';
        if(this.state.userVideos.length > 0) {
            videos = this.state.userVideos.map((val, i ,arr) => {
                console.log(val);
                return <ProfileVideoSlot thumbnail={val.thumbnail} videoID={val.videoID} title={val.title} votes={val.votes}/>
            })
        }
        return(
            <div className='profile-video-background'>
                <div className='profile-video-container'> 
                    <Sidebar />
                        <div className='video-content-container'>
                            <Paper className='profile-videos-paper'>
                                {videos}
                            </Paper>
                        </div>
                </div>
            </div>
        )
    }
} 

{/* <div className='video-entry'>
                            <i onClick={() => this.setState({toggleDeletePrompt: true})} className="fas fa-times"></i>
                            <Link to={`/video/${val.videoID}`}>
                                <img className='profile-videos-thumbnail' src={val.thumbnail} />
                            </Link>
                            {this.state.toggleDeletePrompt ? 
                            <>
                                <div>
                                    <p>Would You Like to Delete this Video?</p>
                                    <button>Yes</button>
                                    <button>No</button>
                                </div>
                            </>
                            : null}
                        </div> */}