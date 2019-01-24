import React, {Component} from 'react';
import {Paper, TextField, Typography, Button} from '@material-ui/core';
import {connect} from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import '../../styles/Register.css'
import {storage} from '../../firebase'
import {changeUsername, changePassword, changeConfirmedPassword, changeFirstName, changeLastName, changeEmail, changeProfilePicture} from '../../ducks/reducer'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({loading: false});

    }
    //WORKING ON PASSING THE FILE TO THE BACKEND
    async handleRegister() {
        if(this.props.password !== this.props.confirmPass) {
            alert('Your passwords do not match. Please try again');
        }
        else { 
            //     const upload = storage.ref(`images/profile/${this.props.username}`).put(this.props.profilePicture)
            //     upload.on('state_changed',() => this.setState({loading: true}) , error => {
            //         console.log(error)
            //     }, () => {
            //         storage.ref('images/profile').child(this.props.username).getDownloadURL().then(response => {
            //             let obj = {
            //                 username: this.props.username,
            //                 password: this.props.password,
            //                 firstName: this.props.firstName,
            //                 lastName: this.props.lastName,
            //                 email: this.props.email,
            //                 profilePicture: response
            //             }
            //             axios.post('/auth/register', obj)
            //             .then(response => {
            //                 console.log(response);
            //             })
            //         })
            // })
            // console.log('Register: ', this.props.username)
            this.setState({loading: true});
        }
    }

    render() {
        return(
            <div className='register-container-1'>
                {/* <div className='register-container-2'> */}
                <Paper className='register-paper'>
                <br />
                    <Typography className='register-text' variant='display1'>
                        Register
                    </Typography>
                    <br />
                    <TextField label='First Name' variant='outlined' onChange={e => this.props.changeFirstName(e.target.value)}/>
                    <br />
                    <TextField label='Last Name' variant='outlined' onChange={e => this.props.changeLastName(e.target.value)} />
                    <br />
                    <TextField label='Username' variant='outlined' onChange={e => this.props.changeUsername(e.target.value)} />
                    <br />
                    <TextField label='Password' type='password' variant='outlined' onChange={e => this.props.changePassword(e.target.value)} />
                    <br />
                    <TextField label='Confirm Password' type='password' variant='outlined' onChange={e => this.props.changeConfirmedPassword(e.target.value)} />
                    <br />
                    <TextField label='Email' type='text' variant='outlined' onChange={e => this.props.changeEmail(e.target.value)} />
                    <br />
                    <Typography>
                        Profile Picture:
                    </Typography>
                    <input type='file' className='profile-picture' onChange={e => this.props.changeProfilePicture(e.target.files[0])}/>
                    <br /> 
                        <Button className='btn-register' variant='contained' label='Sign Up' color='secondary' onClick={() => this.handleRegister()}>
                            Sign Up
                        </Button>
                    <br />
                    <Typography>
                        Already have an account? <Link to='/login'>Login</Link> to continue
                    </Typography>
                    {this.state.loading ? <Redirect to='/loading' /> : null}
                </Paper>
                {/* </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {changeProfilePicture, changeUsername, changeConfirmedPassword, changeEmail, changeFirstName, changeLastName, changePassword})(Register);