import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import '../../styles/VideoPlayer.css'
import {Redirect} from 'react-router-dom'
import axios from 'axios';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
            playing: false,
            volume: .5,
            showVolume: false,
            retainVolume: .5,
            redirect: false
        }
    }
    componentDidMount() {
        console.log(this.props.votable);
        if(this.props.first === true) {
            this.setState({playing: true});
        }
        // console.log(moment().format('LLL'));
    }
    ref = player => {
        this.setState({player})
    }
    toggleVideoProgress = () => {
        this.setState({playing: !this.state.playing})
    }
    handleIncreaseVolume = () => {
        if(this.state.volume < .98) {
            console.log('here');
            
            this.setState({volume: this.state.volume + .1});
        }
    }
    handleDecreaseVolume = () => {
        if(this.state.volume > .1) {
            this.setState({volume: this.state.volume - .1})
        }
    }
    expandVolumePanel = () => {
        this.setState({showVolume: true});
    }
    minimizeVolumePanel = () => {
        this.setState({showVolume: false})
    }
    handleMute = () => {
        if(this.state.volume > 0) {
            let retainVolume = this.state.volume;
            this.setState({volume: 0, retainVolume});
        } else {
            this.setState({volume: this.state.retainVolume})
        }
    }
    handleUpvote = () => {
        axios.put('/api/video/vote', {videoID: this.props.video.videoID})
        .then(response => {
            this.setState({redirect: true})
        })
    }
    render() {
        return(
            <div className=''>
                <div className='behind-video'>
                    <ReactPlayer 
                    ref = {this.ref}
                    className='video' 
                    width={500}
                    height={387}
                    volume={this.state.volume}
                    playing={this.state.playing}
                    url={this.props.video.reference} />
                    <div className='video-navigator' style={{color: 'white'}}>
                        <span style={{color:"white"}} onClick={() => this.toggleVideoProgress()}>{!this.state.playing ? <button className='play-button'><i className="fas fa-play"></i></button> : <button className='pause-button'><i className='fas fa-pause' /></button>}</span>
                        {this.state.volume > 0 ? <button className='mute-button' onClick={() => this.handleMute()}><i className="fas fa-volume-mute" ></i></button> : <button className='unmute-button' onClick={() => this.handleMute()}><i className="fas fa-volume-off" ></i></button>}
                        <button className='volume-down-button' onClick={() => this.handleDecreaseVolume()} ><i className="fas fa-volume-down" /></button>
                        <button className='volume-up-button' onClick={() => this.handleIncreaseVolume()} ><i className="fas fa-volume-up" /></button>
                        <button className='forward-button' onClick={() => this.state.player.seekTo(this.state.player.getCurrentTime() - 5)}><i className="fas fa-undo-alt" /></button>
                        <button className='rewind-button' onClick={() => this.state.player.seekTo(this.state.player.getCurrentTime() + 5)}><i className="fas fa-redo-alt" /></button>
                    </div>
                </div>
                    {this.props.voteable ? <button onClick={() => this.handleUpvote()}>Upvote</button> : null}
                    {this.state.redirect ? <Redirect to='/battle/loading' /> : null}
            </div>
        )
    }
}

export default VideoPlayer