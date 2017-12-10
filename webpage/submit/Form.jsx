import {HelpBlock,FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import axios from 'axios'
var Recaptcha = require('react-recaptcha');


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "request":"pending",
      captchaAnswered: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCaptchaToken = this.setCaptchaToken.bind(this);
    this.onCaptchaLoaded = this.onCaptchaLoaded.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    this.setState({//braces mean eval of 'name'
      [name]:value
    })
  }

  setCaptchaToken(token){
    this.setState({
      captcha : token,
      captchaAnswered : true
    })
  }
  
  onCaptchaLoaded(){
    console.log("captcha loaded")
  }
  

  handleSubmit(event) {
    // alert('A name was submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
    var formData = new FormData();
    this.setState({request:"transit"})
    var audioFile = document.querySelector('#audioFile')
    formData.append("audioFile", audioFile.files[0])
    formData.append("payload", JSON.stringify(this.state))
    axios.post("upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      this.setState({request:"done"})
      if (response.data.redirect === "/uploadComplete") {
            // data.redirect contains the string URL to redirect to
            window.location.href = response.data.redirect;
      }
      else{
        alert(response.data.message)
      }
    }).catch(error => console.log(error));;

  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <div className="row">
              <div className="col">
                  <FormGroup bsSize="small" controlId="song">
                      <ControlLabel>Song Title:</ControlLabel>
                      <FormControl type="text" onChange={this.handleChange} disabled={this.state.request==="pending" ? false:true} />
                  </FormGroup>
              </div>
              <div className="col">
                  <FormGroup bsSize="small" controlId="artist">
                      <ControlLabel>Artist Name:</ControlLabel>
                      <FormControl type="text" onChange={this.handleChange} disabled={this.state.request==="pending" ? false:true} />
                  </FormGroup>
              </div>
          </div>
          <div className="row">
            <div className="col">
              <FormGroup  bsSize="large" controlId="primaryLanguageLyrics">
                <ControlLabel>Primary Language Lyrics:</ControlLabel>
                <FormControl componentClass="textarea" onChange={this.handleChange} disabled={this.state.request==="pending"? false:true}/>
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup  bsSize="large" controlId="pronounciationLyrics">
                <ControlLabel>Pronounciation Lyrics:</ControlLabel>
                <FormControl componentClass="textarea" onChange={this.handleChange} disabled={this.state.request==="pending"? false:true}/>
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup  bsSize="large" controlId="translatedLyrics">
                <ControlLabel>Translated Lyrics (If applicable):</ControlLabel>
                <FormControl componentClass="textarea" onChange={this.handleChange} disabled={this.state.request==="pending"? false:true}/>
              </FormGroup>
            </div>
          </div>
          <FormGroup controlId="audioFile">
            <ControlLabel>MP3 Upload</ControlLabel>
            <br/>
            <FormControl type="file" accept=".mp3" disabled={this.state.request==="pending"? false:true}/>
          </FormGroup>

          <FormGroup  bsSize="large" controlId="times">
            <ControlLabel>Line Timings:</ControlLabel>
            <FormControl componentClass="textarea" onChange={this.handleChange} disabled={this.state.request==="pending"? false:true}/>
          </FormGroup>
          <Recaptcha
            sitekey="6LfZ-TsUAAAAABCx4CayOkJbV_Qm9CW9qGmBUzeS"
            render="explicit"
            onloadCallback={this.onCaptchaLoaded}
            verifyCallback={this.setCaptchaToken}
            theme="dark"
          />
          <input type="submit" value="Submit" id="submit" 
            disabled={this.state.request==="pending" ? !this.state.captchaAnswered: true } 
          />
          <br/>
          <div className = "centered">
              {this.state.request === "transit" ?
                (<img height="150px" width = "150px" src= "loading.gif"></img>):null
              }
          </div>
      </form>
    );
  }
}
