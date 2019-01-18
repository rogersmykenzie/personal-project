import React, {Component} from 'react'

import Sidebar from '../ProfileSidebar/ProfileSidebar'
import {Paper} from '@material-ui/core'
import axios from 'axios';
import '../../styles/ProfileVideos.css';
import {storage} from '../../firebase'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

export default class ProfileVideos extends Component {
    constructor() {
        super()
        this.state = {
            userVideos: []
        }
    }

    componentDidMount() {
        axios.get('/api/user')
        .then(response => {
            let userID = response.data;
            axios.get(`/api/videos/${userID}`).then(response => {
                this.setState({userVideos: [...response.data]})
            })
        })
    }

    render() {
        let videos = 'You have not uploaded any videos yet, grasshopper';
        if(this.state.userVideos.length > 0) {
            videos = this.state.userVideos.map((val, i ,arr) => {
                return <img className='profile-videos-thumbnail' src={val.thumbnail} />
            })
        }
        return(
            <Paper className='profile-video-container'> 
                <Sidebar />
                    <Paper className='profile-videos-paper'>
                        {videos}
                    </Paper>
            </Paper>
        )
    }
} 