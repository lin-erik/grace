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

        <Grid columns={2} style={{marginTop: '10%'}}>
          <Grid.Column width={6}>
            <div style={{marginLeft: '15%', width: '15%', height: '50px', border: '1px solid black'}}>
              Test
            </div>
          </Grid.Column>

          <Grid.Column>
            <Grid columns={3}>
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
                        <a href={rec.url}>
                          ${rec.price}
                        </a>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                ))}
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Results
