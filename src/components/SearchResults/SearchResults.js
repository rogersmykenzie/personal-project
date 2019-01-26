import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import '../../styles/SearchResults.css'

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            searchSortedAuthors: []
        }
    }
    componentDidMount() {
        let searchQuery = this.props.searchQuery.split(' ').join('%20')
        axios.get(`/api/search?search=${searchQuery}`)
        .then(response => {
            axios.post(`/api/users`, {videos: response.data})
            .then(response2 => {
                this.setState({searchResults: response.data, searchSortedAuthors: response2.data})
            })
        })
    }
    render() {
        let results = this.state.searchResults.map((val, i, arr) => {
            return (
            <div className='search-result-capsule'>
                <ul className='search-result-info'>
                    <li><Link to={`/video/${val.videoID}`}><img className='search-results-thumbnail' src={val.thumbnailID} /></Link></li>
                    <div>
                        <li><u><Typography variant='caption'>Title:</Typography> {val.title}</u></li>
                        <li><u><Typography variant='caption'>Score:</Typography> {val.votes}</u></li>
                        <li><u><Typography variant='caption'>Fledgling:</Typography> {this.state.searchSortedAuthors[i].username}</u></li>
                    </div>
                </ul>
            </div>)
        })
        if(results.length < 1) {
            results = 'No Results Were Found'
        }
        return(
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className='search-results-container'>
                    {results}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SearchResults)