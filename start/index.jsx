import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class StartApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			imgWidth:0,
			iNow:1,
			steps:['欢迎来到总理留言厅','正在验证您的身份...']
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

	}

	render() {
		return (
			<div className='lt-start-main-ui' style={{height:this.viewH}}>
				<div className='lt-start-map' ref='lt-start-map' style={{width:this.state.imgWidth}}>
					<img onLoad={(e)=>{this.setState({imgWidth:e.target.width})}} src='./assets/images/start-bg.png'/>
					<img className='lt-door' src='./assets/images/door.png'/>
					<img className='lt-cloud' ref='cloud' src='./assets/images/cloud.png'/>
					<div className='lt-talk'>
						<img src='./assets/images/vilidate-bg.png'/>
						<div>{this.state.steps[this.state.iNow]}</div>
					</div>
					<div className='lt-selected-sex'>
						<h5>请选择性别</h5>
						<div className='lt-sex-group'>
							<div onTouchTap={this.selectedSex.bind(this,1)}>
								<img src='./assets/images/man.png'/>
								<img src='./assets/images/man.png'/>
							</div>
							<div onTouchTap={this.selectedSex.bind(this,0)}>
								<img src='./assets/images/women.png'/>
								<img src='./assets/images/women.png'/>
							</div>
						</div>
					</div>
				</div>
				<div className='lt-visitor' ref='lt-visitor'>
					<img src='./assets/images/visit.png'/>
				</div>
			</div>
		);
	}


	selectedSex(index){

		if(!this.selected){
			this.selected = !this.selected;			
			window.obserable.on('getSex',()=>{
				return index;
			});
			$('.lt-sex-group div').eq(index-1).find('img').eq(1).addClass('active');	
		}
	}


	componentDidMount() {
		var map = $(this.refs['lt-start-map']);
		var speed = 1;
		var startX = 0;
		var cloud = $(this.refs['cloud']);
		var visitor = $(this.refs['lt-visitor']);
		this.timer = setInterval(()=>{
			clearInterval(this.timer);
			startX+=speed;
			if(startX>this.state.imgWidth - this.viewW){
				startX = this.state.imgWidth - this.viewW;
				clearInterval(this.timer);

			}
			map.css({'-webkit-transform':'translate3d(-'+startX+'px,0,0)'});
			cloud.css({'-webkit-transform':'translate3d(-'+startX/3+'px,0,0)'});
			visitor.css({'-webkit-transform':'translate3d('+startX/10+'px,0,0)'})
		},16);
	}
}
export default PubCom(StartApp);