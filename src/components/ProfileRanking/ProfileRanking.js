import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import Sidebar from '../ProfileSidebar/ProfileSidebar'
import axios from 'axios'
import { Link } from "react-router-dom";

import '../../styles/ProfileRanking.css'

export default class ProfileRanking extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        let rankedVideos, userID, userVideos;
        axios.get('/api/rankings').then(response => {
            rankedVideos = response.data;
            axios.get('/api/user').then(response => {
                userID = response.data;
                axios.get(`/api/videos/${userID}`).then(response => {
                    userVideos = response.data;
                    let rankArr = [];
                    for(let ind = 0; ind < userVideos.length; ind++) {
                        console.log(rankedVideos)
                        let index = rankedVideos.findIndex((val, i, arr) => val.videoID === userVideos[ind].videoID);
                        rankArr.push({...rankedVideos[index], rank: index + 1});
                    }
                    rankArr.sort((a, b) => {
                        if(a.rank < b.rank)
                            return -1
                        if(a.rank > b.rank)
                            return 1
                        else
                            return 0
                    })
                    this.setState({videos: rankArr});
                })
            })
        })

    }

    render() {
        let bideos = this.state.videos.map((val, i, arr) => {
            return(
                <div>
                    <ul>
                        <li>{val.rank}</li>
                        <li><Link to={`/video/${val.videoID}`}><img src={val.thumbnailID} /></Link></li>
                        <li>{val.title}</li>
                        <li>{val.votes}</li>
                    </ul>
                </div>
            )
        })
        return(
            <div>
                <div className='profile-ranking-container'> 
                <Sidebar />
                    <Paper className='profile-ranking-paper'>
                        {bideos.length > 0 ? bideos : 'The tournament awaits you, fledgling'}
                    </Paper>
                </div>
            </div>
        )
    }
} 