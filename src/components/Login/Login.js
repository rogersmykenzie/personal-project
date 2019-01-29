import React, { Component } from 'react';
import {Paper, TextField, Typography, Button} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import '../../styles/Login.css'
import {changeLoginUsername, changeLoginPassword, changeProfilePicture, changeBio} from '../../ducks/reducer'
import axios from 'axios';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.setState({redirect: false})
    }

    handleLogin() {
        let obj = {
            username: this.props.loginUsername,
            password: this.props.loginPassword
        }
        axios.post('/auth/login', obj)
        .then(response => {
            this.props.changeProfilePicture(response.data.profilePicture)
            this.props.changeBio(response.data.bio)
            if(response.status === 200) {
                this.setState({redirect: true})
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='login-paper-container-1'>
                <form className='login-paper-container-2'>
                    <Paper className='paper'>
                        <Typography className='login-text' variant='display1'>
                            Login
                        </Typography>
                        <br />
                        <TextField label='Username' variant='outlined' onChange={e => this.props.changeLoginUsername(e.target.value)}>

                        </TextField>
                        <br />
                        <br />
                        <TextField type='password' label='Password' variant='outlined' onChange={e => this.props.changeLoginPassword(e.target.value)} onKeyPress={e => e.key==='Enter' ? this.handleLogin() : null}>

                        </TextField>
                        <br />
                        <Button variant='contained' color='secondary' onClick={() => this.handleLogin()}>
                            Login
                        </Button>
                        <br />
                        <Typography>
                            Don't have an account? <Link to='/register'><span className='auth-link'>Sign Up</span></Link> today.
                        </Typography>
                    </Paper>
                    {this.state.redirect ? <Redirect to='/profile' /> : null}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {changeLoginPassword, changeLoginUsername, changeProfilePicture, changeBio})(Login)