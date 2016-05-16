import React from 'react'
import {render} from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './App'
import History from './components/history/History'
import Players from './components/players/Players'
import BattleReport from './components/battleReport/BattleReport'
import './css/reset.css'
//import '../node_modules/materialize-css/bin/materialize.css'
import './app.scss'
//import '../node_modules/jquery/dist/jquery.min.js'
//import '../node_modules/materialize-css/bin/materialize.js'


render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/history" component={History} />
            <Route path="/players" component={Players} />
            <Route path="/battleReport/:sector" component={BattleReport} />
        </Router>
), document.body);