import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import AOS from 'aos';
import Splash from './Splash.jsx';

import '../styles/css/main.css';

AOS.init({
  duration: 800
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Splash} />
        </Switch>
      </Router>
    );
  }
}

export default App;
