import React, { Component } from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import '../../styles/NavBar.css'

class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            profilePicture: null,
            needless: true
        }
    }
    componentDidMount() {
    //     if(this.state.profilePicture === null) {
    //         console.log('here')
    //         axios.get('/auth/user')
    //         .then(response => {
    //             this.setState({profilePicture: response.data.profilePicture})
    //         })
    //     }
    }

    componentDidUpdate() {
        // if(this.state.profilePicture === null) {
        //     console.log('here')
        //     axios.get('/auth/user')
        //     .then(response => {
        //         console.log('axios finished')
        //         this.setState({profilePicture: response.data.profilePicture})
        //     }).catch(err => console.log(err))
        // }
    }

    render() {
        return (
            <nav className='navbar-container'>
                <AppBar color='primary'>
                    <Toolbar>
                        <Typography>
                            <ul className='navbar'>
                                <li className='navbar-link'>{this.props.profilePicture ? 
                                    <Link className='navbar-link' to='/profile'><img src={this.props.profilePicture} 
                                    className='prof-pic'/> </Link>
                                : <Link to='/login' className='login-button'>Login</Link>}</li>
                            
                                <li className='nav-heading'><Link className='navbar-link' to='/leaderboard'>Leaderboard</Link></li>
                                <li className='nav-heading'><Link className='navbar-link' to='/search'>Search</Link></li>
                                <li className='nav-heading'><Link className='navbar-link' to='/battle/loading'>BATTLE</Link></li>
                            </ul>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </nav>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NavBar);