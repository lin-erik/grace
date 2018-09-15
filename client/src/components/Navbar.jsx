import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Header, Button, Modal } from 'semantic-ui-react'
import TextTransition from 'react-text-transition'

import UploadComponent from './UploadComponent.jsx'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: 'Grace',
      prevPos: 0,
      animateDir: 1,
      showUpload: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.toggleShowUpload = this.toggleShowUpload.bind(this)
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

  toggleShowUpload() {
    this.setState({ showUpload: !this.state.showUpload })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    if (this.props.imageRecs && this.props.imageRecs.length > 0) {
      return <Redirect to={{ pathname: '/results', state: { from: '/' } }} />
    } else {
      return (
        <div
          style={{ position: 'fixed', width: '100%', top: '0px', zIndex: 1 }}
        >
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
            <Modal style={{textAlign: 'center', borderRadius: '2px', backgroundColor: 'rgba(0,0,0,.7)'}}
              trigger={
                <Button
                  id="uploadButton"
                  primary
                  style={{ paddingTop: '0.5em'}}
                  onClick={this.toggleShowUpload}
                >
                  Upload a Photo
                </Button>
              }
              open={this.state.showUpload}
            >
              <Modal.Content style={{backgroundColor:"#696969"}}>
                
                <UploadComponent
                  setImageRecs={this.props.setImageRecs}
                  toggleShowUpload={this.toggleShowUpload}
                />
              </Modal.Content>
            </Modal>
          </Header>
        </div>
      )
    }
  }
}

export default Navbar
