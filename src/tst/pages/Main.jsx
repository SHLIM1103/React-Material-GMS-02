import React from 'react'
import {
    About, AboutMenu, Contacts, Error, Events, Home, MainMenu, PageTemplate, Products
} from '../components'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

export default function Main() {
    return (<div>
        <Router>
            <Switch>
                <Route exact path='/' component={ Home }/>
                <Route path='/about' component={ About }/>
                <Route path='/contacts' component={ Contacts }/>
                <Route path='/events' component={ Events }/>
                <Route path='/products' component={ Products }/>
                <Route component={ Error }/>
            </Switch>
        </Router>
    </div>)
}