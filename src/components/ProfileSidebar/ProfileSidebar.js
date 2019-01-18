import React from 'react';
import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'

import '../../styles/Sidebar.css'
export default function ProfileSidebar() {
    return(
        <Paper>
            <ul className='sidebar'>
                <Link to='/profile'><li>About</li></Link>
                <Link to='/profile/videos'><li>Videos</li></Link>
                <Link to='/profile/ranking'><li>Ranking</li></Link>
                <Link to='/profile/analytics'><li>Analytics</li></Link>
            </ul>
        </Paper>
    )
}