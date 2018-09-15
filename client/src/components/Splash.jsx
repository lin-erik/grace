import React, { Component } from 'react'
import { Parallax } from 'react-parallax'
import { Button, Grid, Modal } from 'semantic-ui-react'
import UploadComponent from './UploadComponent.jsx'

class Splash extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="splash">
        <Parallax
          bgImage={
            'http://images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg'
          }
          strength={700}
        >
          <div className="imageBox">
            <div
              className="imageText"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
              data-aos="fade"
            >
              <Grid textAlign="center">
                <Grid.Row>
                  Meet Grace: Your personal fashion assistant.
                </Grid.Row>
                <Grid.Row>
                  <Modal
                    trigger={
                      <Button
                        style={{ backgroundColor: '#AF6345', color: '#FFFFFF' }}
                      >
                        Get Started
                      </Button>
                    }
                  >
                    <Modal.Content>
                      <UploadComponent setImageRecs={this.props.setImageRecs} />
                    </Modal.Content>
                  </Modal>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </Parallax>
        <Parallax
          bgImage={
            'https://static.dezeen.com/uploads/2017/08/kino-mit-media-lab_dezeen_2364_sq.jpg'
          }
          strength={700}
        >
          <div className="imageBox">
            <div className="imageText" data-aos="fade">
              Grace identifies styles that are uniquely you.
            </div>
          </div>
        </Parallax>
        <Parallax
          bgImage={
            'https://simages.ericdress.com/Upload/Image/2017/11/watermark/016851aa-26f9-4416-aed9-55fa01daa4bb.jpg'
          }
          strength={700}
        >
          <div className="imageBox">
            <div className="imageText" data-aos="fade">
              With one photo, Grace will find items that compliment your look.
            </div>
          </div>
        </Parallax>
        <Parallax
          bgImage={
            'https://www.meandem.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/r/frill2_1_5.jpg'
          }
          strength={700}
        >
          <div className="imageBox">
            <div className="imageText" data-aos="fade">
              <Grid textAlign="center">
                <Grid.Row>Experience the future of fashion.</Grid.Row>
                <Grid.Row>
                  <Modal
                    trigger={
                      <Button
                        style={{ backgroundColor: '#D5B1A4', color: '#FFFFFF' }}
                      >
                        Click to Begin
                      </Button>
                    }
                  >
                    <Modal.Content>
                      <UploadComponent setImageRecs={this.props.setImageRecs} />
                    </Modal.Content>
                  </Modal>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </Parallax>
      </div>
    )
  }
}

export default Splash
