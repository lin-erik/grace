import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Redirect, Switch } from 'react-router'

import '../styles/css/main.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <Switch>
              <Route path="/" exact render={()=>( 
                <div>Hello</div>
              )}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
