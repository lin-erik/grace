import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import TextTransition from 'react-text-transition'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: 'Grace',
      prevPos: 0,
      animateDir: 1
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleClick() {
    this.state.text === 'Grace'
      ? this.setState({ text: 'G.' })
      : this.setState({ text: 'Grace' })
  }

  handleScroll() {
    const currPos = window.scrollY

    if (currPos > this.state.prevPos) {
      this.setState({ text: 'G.', animateDir: 1, prevPos: currPos })
    } else {
      this.setState({ text: 'Grace', animateDir: 0, prevPos: currPos })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div style={{ position: 'fixed', width: '100%', top: '0px', zIndex: 1 }}>
        <Header as="h1">
          <div
            style={{
              backgroundColor: 'white',
              padding: '1%',
              opacity: '0.75'
            }}
          >
            <TextTransition
              delay={0}
              order={this.state.animateDir}
              spring={{ stiffness: 350, damping: 25 }}
              text={this.state.text}
            />
          </div>
          <Button id="uploadButton" primary style={{ paddingTop: '0.5em' }}>
            Upload a Photo
          </Button>
        </Header>
      </div>
    )
  }
}

export default Navbar
