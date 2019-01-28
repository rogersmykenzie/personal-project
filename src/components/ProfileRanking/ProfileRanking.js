import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import Sidebar from '../ProfileSidebar/ProfileSidebar'
import axios from 'axios'
import { Link } from "react-router-dom";
import {Typography} from '@material-ui/core'

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
                    <ul className='video-ranking-list'>
                            <li><Link to={`/video/${val.videoID}`}><img className='video-ranking-thumbnail' src={val.thumbnailID} /></Link></li>
                        <div className='ranking-info'>
                            <li><Typography variant='caption'>Rank</Typography>{val.rank}</li>
                            <li><Typography variant='caption'>Title:</Typography> {val.title}</li>
                            <li><Typography variant='caption'>Battles Survived:</Typography> {val.votes}</li>
                        </div>
                    </ul>
                </div>
            )
        })
        return(
            <div className='profile-ranking-background'>
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