import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function BasicRouter() {
    return (<Router>
        <div style={{ border: '1px solid black', width: '400px', margin: '100px auto' }}>
            <nav>
                <ul>
                    <li><Link to path='/home'>Home</Link></li>
                    <li><Link to path='/about'>About</Link></li>
                    <li><Link to path='/users'>Users</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path='/home'><Home/></Route>
                <Route path='/about'><About/></Route>
                <Route path='/users'><Users/></Route>
            </Switch>
        </div>
    </Router>)
}

function Home() { return ( <h1>Home</h1> ) }
function About() { return ( <h1>HAboutome</h1> ) }
function Users() { return ( <h1>Users</h1> ) }