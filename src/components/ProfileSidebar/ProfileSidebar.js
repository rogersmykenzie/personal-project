import React from 'react';
import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'

import '../../styles/Sidebar.css'
export default function ProfileSidebar() {
    return(
        // <Paper>
            <ul className='sidebar'>
                <Link to='/profile'><li className='sidebar-item'>About</li></Link>'
                <Link to='/profile/videos'><li className='sidebar-item'>Videos</li></Link>
                <Link to='/profile/ranking'><li className='sidebar-item'>Ranking</li></Link>
                <Link to='/profile/analytics'><li className='sidebar-item'>Analytics</li></Link>
            </ul>
        // </Paper>
    )
}