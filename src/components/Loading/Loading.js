import React, { Component } from 'react'
import {storage} from '../../firebase';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {TweenMax} from 'gsap'
import '../../styles/Loading.css'

class Loading extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        const upload = storage.ref(`images/profile/${this.props.username}`).put(this.props.profilePicture)
        upload.on('state_changed', () => {

        }, error => console.log(error), () => {
            storage.ref('images/profile').child(this.props.username).getDownloadURL().then(response => {
                let obj = {
                    username: this.props.username,
                    password: this.props.password,
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    email: this.props.email,
                    profilePicture: response
                }
                axios.post('/auth/register', obj)
                .then(response => {
                    console.log(response);
                    this.setState({redirect: true});
                })
            })
        })
    }
    handleClick() {
        
    }
    
    render() {
        return (
            <>
                {this.state.redirect ? <Redirect to='/' /> : null}
                <div className='test1'></div>
                <button onClick={this.handleClick}>Execute Animation</button>
            </>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(Loading)