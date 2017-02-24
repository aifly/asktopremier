import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IScroll from 'iscroll';
import MapApp from './map/index.jsx';
import DialogApp from './dialog/index.jsx';
import  $ from 'jquery';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
					<MapApp></MapApp>
					<DialogApp></DialogApp>
				</div>
			)
	}
	componentDidMount(){
		

	}
}


 ReactDOM.render(<App/>,document.getElementById('fly-main'));