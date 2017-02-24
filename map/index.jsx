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
				{classId:1,className:'房子'},
				{classId:2,className:'就医'},
				{classId:3,className:'养老'},
				{classId:4,className:'钱包'},
				{classId:5,className:'教育'},
				{classId:6,className:'交通'},
				{classId:7,className:'食品'},
				{classId:8,className:'户口本'},
				{classId:9,className:'办事效率'},
				{classId:10,className:'反腐'},
				{classId:11,className:'就业'},
				{classId:12,className:'环保'},
				{classId:13,className:'互联网+'},
				{classId:14,className:'其他'}
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
				<section className='lt-map-main' style={mainStyle} ref='lt-map-main'>
					<div className='lt-map-person' ref='lt-map-person'></div>
				</section>
			</div>
		);
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