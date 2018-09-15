import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect, Switch } from 'react-router'
import AOS from 'aos'
import Splash from './Splash.jsx'
import Navbar from './Navbar.jsx'
import Results from './Results.jsx'

import '../styles/css/main.css'

AOS.init({
  duration: 800
})

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return React.createElement(component, finalProps)
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest)
      }}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFileUpload: false,
      imageRecs: []
    }
    this.setImageRecs = this.setImageRecs.bind(this)
  }

  setImageRecs(recs) {
    console.log(recs)

    recs.forEach(val => {
      const comma = val.name.indexOf(',')
      const dollar = val.name.indexOf('$')

      if (comma > -1 || dollar > -1) {
        val.name = val.name.slice(0, comma)
        val.name = val.name.slice(0, dollar)
      }
      
      val.price = String(val.price).slice(0 ,String(val.price).indexOf('.'))
    })

    this.setState({
      imageRecs: recs
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar
            imageRecs={this.state.imageRecs}
            setImageRecs={this.setImageRecs}
          />
          <Switch>
            <Route
              path="/results"
              render={props => {
                if (this.state.imageRecs.length > 0) {
                  return (
                    <Results
                      {...props}
                      imageRecs={this.state.imageRecs}
                      setImageRecs={this.setImageRecs}
                    />
                  )
                } else {
                  return <Redirect to={{ pathname: '/' }} />
                }
              }}
            />
            <Route
              exact
              path="/"
              render={props => (
                <Splash {...props} setImageRecs={this.setImageRecs} />
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
