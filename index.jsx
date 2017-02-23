import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IScroll from 'iscroll';
import MapApp from './map/index.jsx';
import  $ from 'jquery';
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
				<div className="wc-video-main-ui">
					<MapApp></MapApp>
				</div>
			)
	}
	componentDidMount(){
		

	}
}


 ReactDOM.render(<App/>,document.getElementById('fly-main'));