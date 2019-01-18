import React, { Component } from 'react';
import S3FileUpload from 'react-s3'
import './App.css';
import './images/headshot2.jpg'
import 'dotenv'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      image: '' ,
      alt: 'nothing yet!'
    }
  }
  
  upload(){
    const { SECRET_ACCESS_KEY , ACCESS_KEY_ID , BUCKET_NAME } = process.env
    S3FileUpload.uploadFile('./images/headshot2.jpg' , {
      bucketname:,
      region: 'us-east-1' ,
      accessKeyId:
      secretAccessKey:
    })
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }
  
  render() {
    return (
      <div className="App">
              <div className="home-main">
        <img src='./images/headshot2.jpg' alt={this.state.alt} />
        <button className="upload-btn" onClick={this.upload}>Upload</button>

      </div>
      </div>
    );
  }
}

export default App;
