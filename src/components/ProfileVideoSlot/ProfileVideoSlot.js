import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class ProfileVideoSlot extends Component {
    constructor() {
        super();
        this.state = {
            toggleDeletePrompt: false
        }
    }

    handleDelete = (id) => {
        axios.delete(`/api/videos/${id}`)
        .then(response => {
            console.log(response);
        })
    }

    render() {
        return(
            <div className='video-entry'>
                <i class="fas fa-times" onClick={() => this.handleDelete(this.props.videoID)}></i>
                <br /><br /><br />
                <Link to={`/video/${this.props.videoID}`}>
                    <img className='profile-videos-thumbnail' src={this.props.thumbnail} />
                </Link>
                {this.state.toggleDeletePrompt ? 
                <>
                    <div>
                        <p>Would You Like to Delete this Video?</p>
                        <button onClick={() => this.handleVideoDelete(this.props.videoID)}>Yes</button>
                        <button onClick={() => this.setState({toggleDeletePrompt: false})}>No</button>
                    </div>
                </>
                : null}
            </div>
        )
    }
}