import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Pie, Scatter} from 'react-chartjs-2'
import axios from 'axios'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import '../../styles/ProfileAnalytics.css'

export default class ProfileAnalysis extends Component {
    constructor() {
        super();
        this.state = {
            videos: [],
            allVotes: []
        }
    }
    componentDidMount() {
        axios.get('/api/user').then(response => {
            axios.get(`/api/videos/${response.data}`)
            .then(secResponse => {
                let arr = secResponse.data.slice();
                console.log(arr);
                let tempArr = [];
                for(let i = 0; i < arr.length; i++) {
                    tempArr.push({label: arr[i].title, votes: arr[i].votes})
                }
                this.setState({videos: tempArr});
                axios.get('/api/all/votes').then(thiResponse => {
                    console.log(thiResponse.data);
                    let userVotes = tempArr.reduce((acc, val) => acc + val.votes, 0);
                    let nonUserVotes = +thiResponse.data - userVotes;
                    this.setState({allVotes: [{label:'User Videos', votes: userVotes}, {label: 'Other Users', votes: nonUserVotes}]})
                })
            })
        })
    }
    generateRandomNumber() {
        return Math.floor((Math.random() * 255))
    }
    giveRandomColor() {
        let num1 = this.generateRandomNumber();
        let num2 = this.generateRandomNumber();
        let num3 = this.generateRandomNumber()
        return `rgb(${num1}, ${num2}, ${num3})`
    }
    render() {
        let labelsArr = [];
        let dataArr = [];
        let labelsArr2 = []
        let dataArr2 = []
        for(let i = 0; i < this.state.videos.length; i++) {
            labelsArr.push(this.state.videos[i].label);
            dataArr.push(this.state.videos[i].votes)
        }
        for(let i = 0; i < this.state.allVotes.length; i++) {
            labelsArr2.push(this.state.allVotes[i].label);
            dataArr2.push(this.state.allVotes[i].votes);
        }
        console.log('data', dataArr, '\n', 'labels', labelsArr);
        return(
            <div className='profile-analysis-background'>
                <div className='profileanalysis-main-container'>
                    {/* {this.state.isAdmin ? <Redirect to='/profile/videos' /> : null} */}
                    <div className='analysis-sidebar'>
                        <ProfileSidebar />
                    </div>
                    <div className='analysis-charts'>
                        <div>
                            <h1 className='chart-headings'>Your Videos</h1>
                            <Pie className='pie-1' data={{
                                labels: labelsArr,
                                datasets: [{
                                label: "My First dataset",
                                backgroundColor: [this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor() ],
                                borderColor: 'black',
                                data: dataArr,
                                }]}
                            } />
                        </div>
                        <br />
                        <div>
                            <h1 className='chart-headings'>All Videos</h1>
                            <Pie className='pie-2' data={{
                                labels: labelsArr2,
                                datasets: [{
                                label: "My First dataset",
                                backgroundColor: [this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor(), this.giveRandomColor() ],
                                borderColor: 'black',
                                data: dataArr2,
                                }]}
                            }/>                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 