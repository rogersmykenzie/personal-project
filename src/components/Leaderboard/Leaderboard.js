import React, { Component } from 'react';
import axios from 'axios';
import LeaderboardSlot from '../LeaderboardSlot/LeaderboardSlot'
import '../../styles/Leaderboard.css'

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            rankedVideos: []
        }
    }
    componentDidMount() {
        axios.get('/api/rankings').then(response => {
            this.setState({rankedVideos: response.data});
        })
    }
    render() {
        let leaderboard = this.state.rankedVideos.map((val, i, arr) => {
            return (
                <LeaderboardSlot ranking={i + 1} reference={val.reference} thumbnailID={val.thumbnailID} title={val.title} userID={val.userID} videoID={val.videoID} votes={val.votes} />
            )
        })
        return(
            <div className='leaderboard-content'>
                {leaderboard}
            </div>
        )
    }
}

export default Leaderboard;