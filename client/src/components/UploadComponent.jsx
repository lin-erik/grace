import React, { Component } from "react";
import axios from "axios";
import { Grid, Input, Button } from "semantic-ui-react";


export default class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
      imageUrl:""
    }
    this.sendImageUrl = this.sendImageUrl.bind(this);
    this.sendImageFile = this.sendImageFile.bind(this);
    // this.uploadToTF = this.uploadToTF.bind(this);
  }
  handleImageUrl(imageUrl){
    this.setState({imageUrl})
  }

  sendImageUrl(){
    axios.post('/api/analyze',{imageUrl:this.state.imageUrl}).then(({data})=>{
      console.log(data)
    })
  }
  encodeImage(file) {
    var reader = new FileReader();
    reader.onloadend = (e) => {
        this.getRecommendations(e.target.result)
    }
    reader.readAsDataURL(file);
  }

  sendImageFile(e){
    e.preventDefault();
    let input = document.getElementById("embedpollfileinput");
    let imageFile = input.files[0];
    let data = new FormData()
    data.append('image', imageFile);
    // data.set('username', this.props.username)

    axios.post('/api/analyze', data)
      .then(({data})=>{
        console.log(data)
    })
    .catch(err=>console.log(err))
  }

  render() {
    return (
      <div>
        <Grid style={{ margin: "10px" }}>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div>
                <div>
                  <label
                    htmlFor="embedpollfileinput"
                    className="ui large blue right floated button">
                    <input type="file"
                      onChange={this.sendImageFile}
                      className="inputfile" id="embedpollfileinput"
                      style={{ width: "0.1px",   height: "0.1px",  opacity: "0", overflow: "hidden",  position: "absolute",    zIndex: "-1"
                      }}/>
                    <i className="ui upload icon" />
                    Upload image
                  </label>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                <Input
                  action={<Button className="ui left floated button" onClick={this.sendImageUrl}>Upload</Button>}
                  size='large' 
                  placeholder='Upload with URL'
                  onChange={(e)=>this.handleImageUrl(e.target.value)}/>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
