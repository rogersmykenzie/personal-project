import React, {Component} from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'

import '../../styles/VideoCard.css'

class VideoCard extends Component {
    render() {
        return (
            <div className='video-card'>
                <VideoPlayer video={this.props.video} first={this.props.first} />
            </div>
        )
    }
}

export default VideoCard