import React, { Component } from 'react'
import VideoCard from '../VideoCard/VideoCard'
import axios from 'axios';

import '../../styles/SoloPlayer.css'

export default class SoloPlayer extends Component {
    constructor() {
        super();
        this.state = {
            video: '',

        }
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        axios.get(`/api/search/video/${this.props.match.params.id}`).then(response => {
            console.log(response);
            this.setState({video: response.data});
        }).catch(err => console.log(err));
    }
    render() {
        return(
            <div className='solo-video-card'>
                <VideoCard video={this.state.video} first={false} voteable={false}/>
            </div>
        )
    }
}