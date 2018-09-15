import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect, Switch } from 'react-router'
import AOS from 'aos'
import Splash from './Splash.jsx'
import Navbar from './Navbar.jsx'
import UploadComponent from './UploadComponent.jsx'

import '../styles/css/main.css'

AOS.init({
  duration: 800
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" component={Splash} />
          </Switch>
        </div>
        <UploadComponent/>
      </Router>
    )
  }
}

export default App
