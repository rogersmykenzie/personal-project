import React from 'react';
import '../../styles/LeaderboardSlot.css'
import {Link} from 'react-router-dom';

const LeaderboardSlot = (props) => {
    return(
        <div className='leaderboard-slot-item'>
            <ul className='ranking-list'>
                <li>{props.ranking}</li>
                <li>{props.votes}</li>
                <li>{props.title}</li>
                <li><Link to={`/video/${props.videoID}`} ><img className='leaderboard-thumbnail' src={props.thumbnailID}/></Link></li>
            </ul>
        </div>
    )
}

export default LeaderboardSlot;