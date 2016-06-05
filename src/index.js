import React from 'react'
import {render} from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './App'
import History from './components/history/History'
import Players from './components/players/Players'
import Material from '../node_modules/material-design-lite/material.min.js'

import './app.scss'

render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/history" component={History} />
            <Route path="/players" component={Players} />
        </Router>
), document.body);