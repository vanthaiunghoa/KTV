import AudioAnimations from '../SharedReactComponents/AudioAnimations.jsx'

export default class AudioPlayer extends React.Component {
	constructor(){
		super();
		this.state = {
			action : "none"
		}
		this.toggleAudioPlayer = this.toggleAudioPlayer.bind(this);
		this.play = this.play.bind(this)
		this.pause = this.pause.bind(this)

		this.getCurrentTime = this.getCurrentTime.bind(this)
	}

	componentWillMount(){
	}

	componentDidMount(){
	 	window.addEventListener("keydown", (e) => { //this event only fires when file uploaded
		    if (e.keyCode == 32 && e.target == document.body) {
	            this.toggleAudioPlayer(); // space bar to toggle audio player
	            e.preventDefault(); // and prevent scrolling
	        }
        });
	}
	componentWillUnmount(){
		URL.revokeObjectURL(this.refs.audioPlayer.src);
		console.log("deleted url reference")
	}

	toggleAudioPlayer(){
		if(this.refs.audioPlayer.paused){
			this.setState({action : "play"});
			setTimeout(function(){
				this.setState({"action": "none"})
			}.bind(this), 2000)
			this.play();
		}
		else{
			this.setState({action : "pause"});
			setTimeout(function(){
				this.setState({"action": "none"})
			}.bind(this), 2000)
			this.pause();
		}
	}

	increaseVolume(){
		this.setState({action : "vol_up"});
		setTimeout(function(){
				this.setState({"action": "none"})
		}.bind(this), 2000)
		if(this.refs.audioPlayer.volume != 1.0)
			this.refs.audioPlayer.volume = this.refs.audioPlayer.volume + .1;
	}

	decreaseVolume(){
		this.setState({action : "vol_down"});
		setTimeout(function(){
				this.setState({"action": "none"})
		}.bind(this), 2000)
		if(this.refs.audioPlayer.volume > .1)
			this.refs.audioPlayer.volume = this.refs.audioPlayer.volume - .1;	
	}

	play(){
		this.refs.audioPlayer.play()
	}

	pause(){
		this.refs.audioPlayer.pause();
	}

	getCurrentTime(){
		return this.refs.audioPlayer.currentTime;
	}
	render() {
		return (
			<div className="text-center">
			    <div className="audioContainer">
			        <audio controls="true" ref="audioPlayer" id="audioPlayer" src={this.props.src}></audio>
			    </div>
			   
				<AudioAnimations action = {this.state.action}/>
			</div>
		);
	}
}