import React, { Component } from 'react'
import VideoCard from '../VideoCard/VideoCard'
import axios from 'axios';

export default class SoloPlayer extends Component {
    constructor() {
        super();
        this.state = {
            video: '',

        }
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        console.log('mountedd')
        axios.get(`/api/search/video/${this.props.match.params.id}`).then(response => {
            console.log(response);
            this.setState({video: response.data});
        }).catch(err => console.log(err));
    }
    render() {
        return(
            <>
                <VideoCard video={this.state.video} first={false} voteable={false}/>
            </>
        )
    }
}