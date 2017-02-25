import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IScroll from 'iscroll';
import MapApp from './map/index.jsx';
import DialogApp from './dialog/index.jsx';
import StartApp from './start/index.jsx';
import IntroduceApp from './introduce/index.jsx';
import SubmitApp from './submit/index.jsx';
import ShareApp from './share/index.jsx';
import  $ from 'jquery';
import Obserable from './assets/js/obserable';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

window.obserable = new Obserable();

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {

		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}		
	render() {
	
		return (
				<div className="lt-main-ui">
					<StartApp></StartApp>
					<IntroduceApp></IntroduceApp>
					<MapApp></MapApp>
					<DialogApp></DialogApp>
					<SubmitApp></SubmitApp>
					<ShareApp></ShareApp>
					
				</div>
			)
	}
	componentDidMount(){
		
		$.ajax({
			url:window.baseUrl+'/h5/update_pvnum/',
			type:"POST",
			data:{
				productid:'957fdef3-fa98-11e6-beb7-c869cda336f9'
			},
			success(data){
				if(data.getret === 0){
					
				}
			}
		})
	}
}


 ReactDOM.render(<App/>,document.getElementById('fly-main'));