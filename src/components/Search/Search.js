import React, { Component } from 'react';
import '../../styles/Search.css'
import {changeSearchQuery} from '../../ducks/reducer';
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Input, Button} from '@material-ui/core'



class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            redirect: false
        }
    }
    handleSearch = () => {
        this.props.changeSearchQuery(this.state.searchQuery)
        this.setState({redirect: true})  
    }
    render() {
        return(
            <div className='search-page'>
                <Input placeholder='Search' className='search-bar' onKeyPress={e => e.key==='Enter' ? this.handleSearch() : null} onChange={(e) => this.setState({searchQuery: e.target.value})} />
                <br />
                <Button variant='outlined' className='search-button' onClick={() => this.handleSearch()} >Search</Button>
                {this.state.redirect ? <Redirect to='/search/results' /> : null}
            </div>
        )
    }
}


const mapStateToProps = state => state;

export default connect(mapStateToProps, {changeSearchQuery})(Search)

