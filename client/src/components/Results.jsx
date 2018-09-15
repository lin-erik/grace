import React, { Component } from 'react'
import Navbar from './Navbar.jsx'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Navbar setImageRecs={this.props.setImageRecs} />
  }
}

export default Results
