import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {Typography} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';

import '../../styles/ProfileVideoSlot.css'

export default class ProfileVideoSlot extends Component {
    constructor() {
        super();
        this.state = {
            toggleDeletePrompt: false,
            videoExists: true
        }
    }

    handleDelete = (id) => {
        toast('Video Deleted')
        axios.delete(`/api/videos/${id}`)
        .then(response => {
            console.log(response)
        })
        
    }

    render() {
        return(
            <div className='video-entry'>
                <Link to={`/video/${this.props.videoID}`}>
                    <img className='profile-videos-thumbnail' src={this.props.thumbnail} />
                </Link>
                <ul className='video-slot-list'>
                    <li className='video-slot-list-item'>
                        <Typography variant='caption'>
                            Title:
                        </Typography>
                        {this.props.title}
                    </li>
                    <li className='video-slot-list-item'>
                        <Typography variant='caption'>
                            Battles Won:
                        </Typography>
                        {this.props.votes}
                    </li>
                </ul>
                <i class="far fa-trash-alt delete-video" onClick={() => this.setState({toggleDeletePrompt: !this.state.toggleDeletePrompt})}></i>
                {this.state.toggleDeletePrompt ? 
                <>
                    <div>
                        <p>Would You Like to Delete this Video?</p>
                        <button onClick={() => this.handleDelete(this.props.videoID)}>Yes</button>
                        <button onClick={() => this.setState({toggleDeletePrompt: false})}>No</button>
                    </div>
                </>
                : null}
            </div>
        )
    }
}