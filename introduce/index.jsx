import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class IntroduceApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			pv:1000,
			starting:false,
			ending:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var style = {
			background:'url(./assets/images/intr-bg.jpg) no-repeat center top',
			backgroundSize:'cover'

		}

		var pvStyle ={
			background:'url(./assets/images/count-bg.png) no-repeat center center',
			backgroundSize:'contain'
		}

		return (
			<div className={'lt-intro-main-ui '+  (this.state.starting?"active ":' ')+  (this.state.ending?"hide ":' ')} style={style}>
				<div className='lt-pv' style={pvStyle}>
					欢迎第<span>{this.state.pv}</span>位参与者
				</div>
				<div className='lt-begin' onTouchTap={this.beginGame.bind(this)}>
					<img src='./assets/images/begin.png'/>
					<img src='./assets/images/begin.png' ref='hidden'/>
				</div>
			</div>
		);
	}

	beginGame(){
		this.refs['hidden'].classList.add('active');
		this.setState({
			starting:false,
			ending:true
		});
		window.obserable.trigger({type:'showMap'});
	}


	componentDidMount() {

		window.obserable.on('showIntro',()=>{
			this.setState({
				starting:true
			})
		})

		var s= this;
		$.ajax({
			url:window.baseUrl+'h5/select_pvnum/',
			data:{
				productid:'957fdef3-fa98-11e6-beb7-c869cda336f9'
			},
			type:'post',
			success(data){
				if(data.getret === 0){
					s.setState({pv:data.totalpvnum});
				}
			}
		})
	}
}
export default PubCom(IntroduceApp);