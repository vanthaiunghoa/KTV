import PageHeader from '../SharedReactComponents/Header.jsx'
import UploadContainer from './UploadContainer.jsx'
import AudioPlayer from './AudioPlayer.jsx'
import Lyrics from './Lyrics.jsx'
import PrettyPrint from './PrettyPrint.jsx'

import ReactDOM from 'react-dom';
import {createMathRounding} from './round.js';


const englishRegex = /^[A-Za-z0-9 \n]*$/
const timestampFormatRegex = /[0-9]:[0-5][0-9]/
const newline = /\n/;

export default class MainContainer extends React.Component {
	constructor(){
		super();
		this.state = {
			lyrics : [],
			timestamps: [],
			arrayIndex: 0,
		}
		createMathRounding();

		this.recordTime = this.recordTime.bind(this)
		this.secondsToTimestamp = this.secondsToTimestamp.bind(this)
		this.setLyrics = this.setLyrics.bind(this);
		this.setAudioSource = this.setAudioSource.bind(this);
		this.updateTimestamp = this.updateTimestamp.bind(this);
	}
	componentWillMount(){
	  	
	}
	componentDidMount(){
	   
	}
	componentWillUnmount(){
	
	}

	recordTime(){
		let time = this.secondsToTimestamp();
		let timestamps = this.state.timestamps;
		timestamps[this.state.arrayIndex] = time;
		//keep incrementing arrayIndex if the next line is empty
		//we are done.
		let arrayIndex = this.state.arrayIndex + 1;
		if(arrayIndex == this.state.lyrics.length){
			this.setState({timestamps: timestamps})
			return;
		}
	
		//apparently "" is a length of 1....
		while (this.state.lyrics[arrayIndex].length == 1){
			timestamps[arrayIndex] = "";
			console.log("nextLine is empty")
			arrayIndex++;
		}
    	this.setState({timestamps: timestamps, arrayIndex: arrayIndex})
        // $("#" + lineNum).addClass("lead font-weight-bold");
	}


	secondsToTimestamp() {

		let seconds = Math.round10(this.refs.audioPlayer.getCurrentTime(), -2)
	    var minuteTimestamp = Math.floor(seconds / 60);
	    var secondsTimestamp = Math.floor(seconds % 60);
	    if (secondsTimestamp < 10)
	        secondsTimestamp = "0" + secondsTimestamp;

	    //cant do +, otherwise it just adds the two numbers
	    var time = "" + minuteTimestamp + secondsTimestamp;
	    return time;
	}

	setLyrics(lyrics){
		this.setState({lyrics : lyrics});
	}

	setAudioSource(objectUrl){
		this.setState({audioSource: objectUrl});
	}

	updateTimestamp(lineNumber, newTimestamp){
		let timestamps = this.state.timestamps;
		timestamps[lineNumber] = newTimestamp;
		this.setState({timestamps: timestamps})
		console.log("timestamp updated");
	}

	render() {
		return (
			<div>
				
				<PageHeader/>
				<div className = "container">
		    		<UploadContainer recordTime = {this.recordTime}
		    			setLyrics = {this.setLyrics} setAudioSource = {this.setAudioSource}/>
		    		<AudioPlayer ref = "audioPlayer" src= {this.state.audioSource}/>
		      	
					
		            
		            <Lyrics arrayIndex = {this.state.arrayIndex} 
		            	lyrics = {this.state.lyrics}
		            	timestamps = {this.state.timestamps}
		            	updateTimestamp = {this.updateTimestamp} />
		            <br/>
		            <PrettyPrint timestamps = {this.state.timestamps}/>

		        </div>
		  	</div>
		);
	}

}

ReactDOM.render(
  <MainContainer/>,
  document.getElementById('content')
);
