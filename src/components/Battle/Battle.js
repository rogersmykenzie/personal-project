import React, {Component} from 'react';
import { connect } from 'react-redux';

import VideoCard from '../VideoCard/VideoCard'
import '../../styles/Battle.css'
class Battle extends Component {
    render() {
        return(
            <div className='player-container'>
                <VideoCard video={this.props.video1} first={true} votable={true}/>
                <VideoCard video={this.props.video2} first={false} votable={true}/>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Battle);