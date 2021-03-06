import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import Loading from './components/Loading/Loading'
import ProfileAnalysis from './components/ProfileAnalysis/ProfileAnalysis';
import ProfileRanking from './components/ProfileRanking/ProfileRanking'
import ProfileVideos from './components/ProfileVideos/ProfileVideos'
import Battle from './components/Battle/Battle';
import BattleLoading from './components/BattleLoading/BattleLoading'
import Leaderboard from './components/Leaderboard/Leaderboard';
import Search from './components/Search/Search'
import SearchResults from './components/SearchResults/SearchResults'
import SoloPlayer from './components/SoloPlayer/SoloPlayer'

export default (
        <Switch>
            <Route path='/profile/videos' component={ProfileVideos} />
            <Route path='/profile/ranking' component={ProfileRanking} />
            <Route path='/profile/analytics' component={ProfileAnalysis} />
            <Route path='/loading' component={Loading} />
            <Route path='/profile' component={Profile} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/battle/loading' component={BattleLoading} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/search/results' component={SearchResults} />
            <Route path='/video/:id' component={SoloPlayer} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/battle' component={Battle} />
            <Route exact path='/' component={Home} />
        </Switch>
)