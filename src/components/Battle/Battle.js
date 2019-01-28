import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import VideoCard from '../VideoCard/VideoCard'
import '../../styles/Battle.css'
class Battle extends Component {
    render() {
        if(this.props.video1.videoID === undefined) {
            return <Redirect to='/battle/loading' />
        }
        return(
            <div className='player-container'>
                <VideoCard video={this.props.video1} first={true} votable={true}/>
                <h1 className='versus'>V.S.</h1>
                <VideoCard video={this.props.video2} first={false} votable={true}/>
                <br />
            </div>
        )
    }
}

const mapStateToProps = state => state;

Battle.propTypes = {
    interactions: PropTypes.number,
    reference: PropTypes.string,
    tags: PropTypes.string,
    thumbnailID: PropTypes.string,
    title: PropTypes.string,
    userID: PropTypes.number,
    videoID: PropTypes.number,
    votes: PropTypes.number,
}
/*interactions: 0
reference: "https://firebasestorage.googleapis.com/v0/b/personal-project-88145.appspot.com/o/videos%2Fbattle%2F5?alt=media&token=35d24fb3-e50b-4c22-b894-1e1a83f33106"
tags: "caprisun, capri, sun, toss, throw, me"
thumbnailID: "https://firebasestorage.googleapis.com/v0/b/personal-project-88145.appspot.com/o/images%2Fthumbnails%2F5?alt=media&token=507eb07c-feb0-4142-af93-e827658a479a"
title: "Can You Pass Me Another CapriSun?"
userID: 3
videoID: 5
votes: 9*/
export default connect(mapStateToProps)(Battle);