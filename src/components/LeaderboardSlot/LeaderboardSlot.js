import React from 'react';
import '../../styles/LeaderboardSlot.css'
import {Link} from 'react-router-dom';
import {Typography} from '@material-ui/core'

const LeaderboardSlot = (props) => {
    return(
        <div className='leaderboard-slot-item'>
            <ul className='ranking-list'>
                <li><Link to={`/video/${props.videoID}`} ><img className='leaderboard-thumbnail' src={props.thumbnailID}/></Link></li>
                <div>
                    <li><Typography variant='caption'>Rank</Typography>{props.ranking}</li>
                    <li><Typography variant='caption'>Score:</Typography>{props.votes}</li>
                    <li><Typography variant='caption'>Title:</Typography>{props.title}</li>
                </div>  
            </ul>
        </div>
    )
}

export default LeaderboardSlot;