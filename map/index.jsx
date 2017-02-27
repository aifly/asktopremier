import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import IScroll from 'iscroll';
class MapApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			mainHeight:0,
			starting:true,
			defaultSteps:['./assets/images/vl.png','./assets/images/vl1.png','./assets/images/vl2.png','./assets/images/vl3.png'],
			rightSteps:['./assets/images/visit.png','./assets/images/visit1.png','./assets/images/visit2.png','./assets/images/visit3.png'],
			steps:['./assets/images/vl.png','./assets/images/vl1.png','./assets/images/vl2.png','./assets/images/vl3.png'],
			currentStep:1,
			currentCate:0
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

		this.cate = [
			{classid:1,classname:'住房',navImg:'fc'},
			{classid:2,classname:'就医',navImg:'jiuyi'},
			{classid:3,classname:'养老',navImg:'yl'},
			{classid:4,classname:'钱包',navImg:'qb'},
			{classid:5,classname:'教育',navImg:'jiaoyu'},
			{classid:6,classname:'交通',navImg:'jt'},
			{classid:7,classname:'食品',navImg:'sp'},
			{classid:8,classname:'户口本',navImg:'hkb'},
			{classid:9,classname:'办事效率',navImg:'bsxl'},
			{classid:10,classname:'反腐',navImg:'ff'},
			{classid:11,classname:'就业',navImg:'jy'},
			{classid:12,classname:'环保',navImg:'hb'},
			{classid:13,classname:'互联网+',navImg:'hlw'},
			{classid:14,classname:'其他',navImg:'qt'}
		]
	}
	render() {

		let mainStyle= {
			height:this.state.mainHeight,
			background:'url(./assets/images/map.jpg) no-repeat center bottom',
			backgroundSize:'contain'
		}

		var cateStyle ={
			background:'url(./assets/images/class-bg.png) no-repeat center top',
			backgroundSize:'contain'
		}
		var cateActiveStyle ={
			background:'url(./assets/images/1.gif) no-repeat center top',
			backgroundSize:'contain'
		}

		return (
			<div  className={'lt-map-main-ui '+ (this.state.starting?'active':'')}>
				<div className='lt-map-img'>
					<img onLoad={(e)=>{this.setState({mainHeight:e.target.height});this.mainScroll && this.mainScroll.refresh()}} src='./assets/images/map.jpg' ref='hiddenimg'/>
				</div>
				<div className='lt-map-scroll' ref='lt-map-scroll' style={{height:this.viewH - this.viewW / 10 * 2 ,overflow:'hidden'}}>
						
					<section  className='lt-map-main' style={mainStyle} ref='lt-map-main'>

						{
							this.cate.map((item,i)=>{

								return <div onTouchTap={this.showDialog.bind(this,item.classid,item.classname)} className='lt-cate-name' key={i}>
												<img src={this.state.currentCate === i ? './assets/images/1.gif':'./assets/images/1.gif'}/>
												<span>{item.classname}</span>
										</div>	
							})
						}
						<div className='lt-map-person' ref='lt-map-person'>
							<img src={this.state.steps[this.state.currentStep]}/>
						</div>
						
						<div className='lt-ar'  style={{WebkitTransform:'rotate(140deg)'}}>
										<img src='./assets/images/ar.gif'/>
									</div>
						
					</section>
				</div>
				

				<nav className='lt-nav-scroll' ref='lt-nav-scroll'>
						<ul className='lt-nav-list'>
								{this.cate.map((item,i)=>{
									return <li key={i} onTouchTap={this.showDialog.bind(this,item.classid,item.classname)}><img src={'./assets/images/'+item.navImg+(this.state.currentCate===i?'':'')+'.png'}/></li>
								})}
						</ul>
				</nav>
			</div>
		);
	}
	showDialog(classid,classname){
		
		window.obserable.trigger(
			{
				type:"showDialog",
				data:{classid:classid,classname:classname}
			});
	}
	componentDidMount() {

		window.obserable.on('showMap',()=>{
			this.setState({
				starting:true
			})
		})

	var navScroll =	new IScroll(this.refs['lt-nav-scroll'],{
			scrollX:true,
			scrollY:false
		});

		setTimeout(()=>{
			this.mainScroll = new IScroll(this.refs['lt-map-scroll']);
			this.mainScroll.scrollTo(0,-(this.state.mainHeight - (this.viewH - this.viewW / 10 * 2)),200);
		},1000)


		var sin= Math.sin,
				PI = Math.PI;
		var self = this;
		var person = this.refs['lt-map-person'];
		this.times =  0;

	/*	$(this.refs['lt-map-main']).on('touchstart',function(e){

			this.startAngle === undefined  && (this.startAngle = -90);
			var s = this;

			s.startY = e.originalEvent.changedTouches[0].pageY;
			s.step = 0;
			s.step1 = 0;
			s.iNow =0;
			s.iNow1 = 0;
			$(document).on('touchmove',function(e){

				var endY =  e.originalEvent.changedTouches[0].pageY;

				var times = 0;
				
			  	times = ((s.startAngle + 90) / 180 | 0);
					self.times = times;
					if(times>13 && endY >= s.startY){
						s.startY = endY;
						return;
					}
			

				if(endY >= s.startY){
					s.startAngle+=20;
					if(self.state.steps[0] !== './assets/images/visit.png'){
						self.setState({
							steps:self.state.defaultSteps
						})
					}else{
						self.setState({
							steps:self.state.rightSteps
						})
					}
					if(s.step%4 === 0){
						s.step = 0;
						s.iNow++;
						s.iNow = s.iNow % 4;
					};
					self.setState({
						currentStep:s.iNow
					})
					s.step++;
				}
				else{
					s.startAngle-=20;
					if(s.step1%4 === 0){
						s.step1 = 0;
						s.iNow1++;
						s.iNow1 = s.iNow1 % 4;
					};


					if(self.state.steps[0] === './assets/images/vl.png'){
						self.setState({
							steps:self.state.defaultSteps,
							currentStep:s.iNow1
						})
					}else{
						self.setState({
							steps:self.state.rightSteps,
							currentStep:s.iNow1
						})
					}
					s.step1++;
				}


				
				var right = -(self.viewW / 4.2 * sin(s.startAngle/180*PI) + self.viewW / 2 - self.viewW/10*3);
				var bottom = -(((self.viewW / 9.4) *s.startAngle/180*PI)+self.viewW / 5.2) ;
				


					if(endY >= s.startY){//判断是往上移动还是往下移动。
						self.setState({
							currentCate:times,
							steps:times % 2===0 ? self.state.defaultSteps:self.state.rightSteps
						})
					}else{
						self.setState({
							currentCate:times,
							steps:times % 2 ===1 ? self.state.defaultSteps:self.state.rightSteps
						})
					}

					navScroll.scrollTo(times * self.viewW/10 * -2,0,200)

				if(bottom>=0){
					bottom = 0;
					right = 0;
					s.startAngle= -90;
				}

				$(person).css({
					'-webkit-transform':'translate3d(' + right + 'px,' + bottom + 'px,0)'
				})
				var top = -bottom/1.2;
				if(top>self.state.mainHeight-self.viewH ){
					top = self.state.mainHeight-self.viewH;
				}
				$(s).css({
					'-webkit-transform':'translate3d(0,' + top + 'px,0)'
				})
				 
				s.startY = endY;
			}).on('touchend',function(){
				$(this).off('touchend touchmove');
				self.setState({
					currentStep:1
				})
			});
		});*/
	}
}
export default PubCom(MapApp);