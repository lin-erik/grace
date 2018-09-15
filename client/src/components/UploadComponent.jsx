import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Input, Button } from 'semantic-ui-react'

export default class UploadComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: ''
    }
    this.sendImageUrl = this.sendImageUrl.bind(this)
    this.sendImageFile = this.sendImageFile.bind(this)
  }
  handleImageUrl(imageUrl) {
    this.setState({ imageUrl })
  }

  sendImageUrl() {
    axios
      .post('/api/analyze', { imageUrl: this.state.imageUrl })
      .then(({ data }) => {
        console.log(data)
        this.props.setImageRecs(data)
      })
      .then(() => {
        if (this.props.toggleShowUpload) {
          this.props.toggleShowUpload()
        }
      })
  }
  encodeImage(file) {
    var reader = new FileReader()
    reader.onloadend = e => {
      this.getRecommendations(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  sendImageFile(e) {
    e.preventDefault()
    let input = document.getElementById('embedpollfileinput')
    let imageFile = input.files[0]
    let data = new FormData()
    data.append('image', imageFile)

    axios
      .post('/api/analyze', data)
      .then(({ data }) => {
        console.log(data)
        this.props.setImageRecs(data)
      })
      .then(() => {
        if (this.props.toggleShowUpload) {
          this.props.toggleShowUpload()
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Grid style={{ margin: '10px' }}>
          <Grid.Row centered columns={1}>
            <Grid.Column>
              <div style={{display:"flex", justifyContent:"center"}}>
                <div>
                  <label
                    htmlFor="embedpollfileinput"
                    className="ui large blue button">
                    <input
                      type="file"
                      onChange={this.sendImageFile}
                      className="inputfile"
                      id="embedpollfileinput"
                      style={{
                        width: '0.1px',
                        height: '0.1px',
                        opacity: '0',
                        overflow: 'hidden',
                        position: 'absolute',
                        zIndex: '-1'
                      }}/>
                    <i className="ui upload icon" />
                    Upload image
                  </label>
                </div>
                <div style={{marginLeft:"16px"}}>
                <Input
                  action={
                    <Button
                      className="ui left floated button"
                      onClick={this.sendImageUrl}
                    >
                      Upload
                    </Button>
                  }
                  size="large"
                  placeholder="Upload with URL"
                  onChange={e => this.handleImageUrl(e.target.value)}
                />
              </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
