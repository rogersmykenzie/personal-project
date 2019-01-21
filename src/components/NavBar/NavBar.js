import React, { Component } from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import axios from 'axios'
import {Link} from 'react-router-dom'

import '../../styles/NavBar.css'

export default class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            profilePicture: null,
            needless: true
        }
    }

    componentDidUpdate() {
        if(this.state.profilePicture === null) {
            console.log('here')
            axios.get('/auth/user')
            .then(response => {
                this.setState({profilePicture: response.data.profilePicture})
            })
        }
    }
    render() {
        return (
            <nav className='navbar-container'>
                <AppBar color='primary'>
                    <Toolbar>
                        <Typography>
                            <ul className='navbar'>
                            <Link to='/profile'>
                                <li>{this.state.profilePicture ? 
                                    <img src={this.state.profilePicture} 

                                    className='prof-pic'/> 
                                : 'Profile'}</li>
                            </Link>
                                <li className='nav-heading'>Leaderboard</li>
                                <li className='nav-heading'>Search</li>
                                <li className='nav-heading'><Link to='/battle/loading'>BATTLE</Link></li>
                            </ul>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </nav>
        )
    }
}