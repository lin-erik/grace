import React, { Component } from 'react'
import { Grid, Card, Image } from 'semantic-ui-react'

import Navbar from './Navbar.jsx'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Navbar setImageRecs={this.props.setImageRecs} />

        <Grid columns={2}>
          <Grid.Row>
            <div
              style={{
                marginTop: '5%',
                marginLeft: '5%',
                width: '90%',
                border: '1px solid black'
              }}
            >
              <div className="google-maps-container">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="300"
                      id="gmap_canvas"
                      src={`https://maps.google.com/maps?q=Fashion%Stores&output=embed`}
                      frameBorder="0"
                      scrolling="yes"
                      marginHeight="0"
                      marginWidth="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid.Row>

          <Grid.Row>
            <div
              style={{
                marginLeft: '5%',
                width: '90%'
              }}
            >
              <Grid columns={5}>
                {this.props.imageRecs.map((rec, ind) => (
                  <Grid.Column key={ind}>
                    <Card>
                      <Image src={rec.imageUrl} />
                      <Card.Content>
                        <Card.Header>{rec.name}</Card.Header>
                        <Card.Meta>
                          <span>{rec.brandName}</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                        <a href={rec.url}>${rec.price}</a>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                ))}
              </Grid>
            </div>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Results
