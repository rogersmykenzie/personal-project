import React, {Component} from 'react';
import {Elastic, TimelineMax} from 'gsap'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {changeVideo1, changeVideo2} from '../../ducks/reducer';
import '../../styles/BattleLoading.css'

class BattleLoading extends Component {
    constructor() {
        super();
        this.state = {
            redirectToBattle: false
        }
    }
    componentDidMount() {
        this.setState({redirectToBattle: false})
        // try using a while loop with the redirect toggle as the conditional
        // TweenMax.to('.shape-one', 2, {rotation: 720})
        // TweenMax.to('.shape-two', 2, {rotation: 720})
        // TweenMax.to('.shape-three', 2, {rotation: 720})
        // TweenMax.to('.shape-one', .56 , {x: -280, delay: 2})
        // TweenMax.to('.shape-two', 1, {x: -500, delay: 2.3, scale: .7})
        // TweenMax.to('.shape-three', 1, {x: -500, delay: 2.6, scale: 1.4})
        // TweenMax.to('.shape-one', .001, {x:1300, delay: 2.56})
        // TweenMax.to('.shape-one', .43, {x: 1000, delay: 2.57})
        // TweenMax.to('.shape-one', 1, {rotation: 720, delay: 10});
        // TweenMax.to('.shape-two', 1, {rotation: 720, delay: 3});
        // TweenMax.to('.shape-three', 1, {rotation: 720, delay: 3});
        var tl = new TimelineMax({repeat: -1});
        tl.to('.shape-one', .3, {height: 200, ease: Elastic.easeOut.config(.5, .1)})
        tl.to('.shape-two', .3,{height: 200, ease: Elastic.easeOut.config(.5, .1)})
        tl.to('.shape-three', .3, {height: 200, ease: Elastic.easeOut.config(.5, .1)})
        tl.to('.shape-one', .2, {height: 100})
        tl.to('.shape-two', .2, {height: 100})
        tl.to('.shape-three', .2, {height: 100})
        console.log('test')
        axios.get('/api/video/random')
        .then(response => {
            console.log(response);
            this.props.changeVideo1(response.data.video1);
            this.props.changeVideo2(response.data.video2);
            setTimeout(() => this.setState({redirectToBattle: true}),1000);
        }).catch(err => console.log(err));
    }


    render() {
        return(
            <div className='loading-background'>
                <div className='loading-container' draggable>
                    <h1>Loading</h1>
                    <div className='shape-one'></div>
                    <div className='shape-two'></div>
                    <div className='shape-three'></div>
                    {this.state.redirectToBattle ? <Redirect to='/battle' /> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {changeVideo1, changeVideo2})(BattleLoading)