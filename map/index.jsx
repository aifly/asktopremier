import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
class MapApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			 mainHeight:0,
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		//房子、、  、、 、 、 、  、 、、  、 、其他
		this.cate = [
				{classid:1,classname:'房子'},
				{classid:2,classname:'就医'},
				{classid:3,classname:'养老'},
				{classid:4,classname:'钱包'},
				{classid:5,classname:'教育'},
				{classid:6,classname:'交通'},
				{classid:7,classname:'食品'},
				{classid:8,classname:'户口本'},
				{classid:9,classname:'办事效率'},
				{classid:10,classname:'反腐'},
				{classid:11,classname:'就业'},
				{classid:12,classname:'环保'},
				{classid:13,classname:'互联网+'},
				{classid:14,classname:'其他'}
		]
	}
	render() {

		let mainStyle= {
			height:this.state.mainHeight,
			background:'url(./assets/images/map.jpg) no-repeat center bottom',
			backgroundSize:'contain'
		}

		return (
			<div  className='lt-map-main-ui'>
				<div className='lt-map-img'>
						<img onLoad={(e)=>{this.setState({mainHeight:e.target.height})}} src='./assets/images/map.jpg' ref='hiddenimg'/>
				</div>
				<section onTouchTap={this.showDialog.bind(this)} className='lt-map-main' style={mainStyle} ref='lt-map-main'>
					<div className='lt-map-person' ref='lt-map-person'></div>
				</section>
			</div>
		);
	}
	showDialog(e){
		window.obserable.trigger({type:"showDialog",data:1});
	}
	componentDidMount() {


		/*
	
			var span = document.querySelector('#box span');
		  		var angle = -90;
		  		var doc = document;
		  		var body = doc.getElementById('box');
		  		var viewW = document.documentElement.clientWidth;
		  		setInterval(()=>{
		  			angle++;
		  			var right = (viewW / 4.2 *Math.sin(angle/180*Math.PI) + viewW / 2) + 'px'
		  			var bottom = (((viewW/9.4) *angle/180*Math.PI)+viewW / 5.2) + 'px'
		  			span.style.right = right;
		  			span.style.bottom = bottom;
		  			var box = doc.createElement('div');
		  			box.className = 'box';
		  			box.style.right =right;
		  			box.style.bottom = bottom;
		  			body.appendChild(box);
		  		},10);
				
		*/


		var self = this;
		var person = this.refs['lt-map-person'];
		$(this.refs['lt-map-main']).on('touchstart',function(e){

				this.startAngle === undefined  && (this.startAngle = -90);
				var s = this;

				s.startY = e.originalEvent.changedTouches[0].pageY;

				$(document).on('touchmove',function(e){
						
						var endY =  e.originalEvent.changedTouches[0].pageY;
						if(endY >s.startY){
							s.startAngle+=2;
						}
						else{
							s.startAngle-=2;
						}

						s.startY = endY;
						var right = -(self.viewW / 4.2 * Math.sin(s.startAngle/180*Math.PI) + self.viewW / 2 - self.viewW/10*2.5);
		  			var bottom = -(((self.viewW / 9.4) *s.startAngle/180*Math.PI)+self.viewW / 5.2) ;
		  			if(s.startAngle%180 === 0){
		  					var times = s.startAngle / 180;
		  					console.log(self.cate[times]);
		  			}
		  			if(bottom>0){
		  				bottom = 0;
		  				right = 0;
		  				s.startAngle= -90;
		  			}
		  			$(person).css({
		  				'-webkit-transform':'translate3d(' + right + 'px,' + bottom + 'px,0)'
		  			})
/*		  			person.style.right = right;
		  			person.style.bottom = bottom;*/

				}).on('touchend',function(){
						$(this).off('touchend touchmove');
				});
		});
 	}
}
export default PubCom(MapApp);