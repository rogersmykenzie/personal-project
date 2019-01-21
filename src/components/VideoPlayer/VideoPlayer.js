import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import '../../styles/VideoPlayer.css'

class VideoPlayer extends Component {
    constructor() {
        super();
        this.state = {
            player: null,
            playing: false,
            volume: .5,
            showVolume: false,
            retainVolume: .5
        }
    }
    componentDidMount() {
        if(this.props.first === true) {
            this.setState({playing: true});
        }
    }
    ref = player => {
        this.setState({player})
    }
    toggleVideoProgress = () => {
        this.setState({playing: !this.state.playing})
    }
    handleIncreaseVolume = () => {
        if(this.state.volume < 1) {
            this.setState({volume: this.state.volume + .1});
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
            this.setState({volume: -5, retainVolume});
        } else {
            this.setState({volume: this.state.retainVolume})
        }
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
                        <span style={{color:"white"}} onClick={() => this.toggleVideoProgress()}>{!this.state.playing ? <i class="fas fa-play"></i> : <i class='fas fa-pause' />}</span>
                        
                        {/* onMouseEnter={() => this.expandVolumePanel()} onMouseLeave={() => this.minimizeVolumePanel()} */}
                        
                        <div className='slider-container'>
                            <i class="fas fa-volume-up" onClick={() => this.handleMute()} />
                            <div className='slider-container-2'>
                                <input className='volume-slider' type='range' orient='vertical'/>
                            </div>
                        </div>
                        <i class="fas fa-redo-alt" onClick={() => this.state.player.seekTo(this.state.player.getCurrentTime() + 5)} />
                        <i class="fas fa-undo-alt" onClick={() => this.state.player.seekTo(this.state.player.getCurrentTime() - 5)} />
                    </div>
                </div>
                    <button>Updoot</button>
            </div>
        )
    }
}

export default VideoPlayer