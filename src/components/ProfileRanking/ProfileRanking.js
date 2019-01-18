import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import Sidebar from '../ProfileSidebar/ProfileSidebar'
import axios from 'axios'

import '../../styles/ProfileRanking.css'

export default class ProfileRanking extends Component {

    componentDidMount() {
        axios.get('/api/rankings')
        .then(response => {
            console.log(response.data);
        })
    }

    render() {

        return(
            <div>
                <Paper className='profile-ranking-container'> 
                <Sidebar />
                    <Paper className='profile-ranking-paper'>

                    </Paper>
                </Paper>
            </div>
        )
    }
} 