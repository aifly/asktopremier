import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class StartApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			imgWidth:0,
			iNow:-1,
			steps:['欢迎来到总理留言厅','正在验证您的身份...'],
			visitorList:['./assets/images/visit.png','./assets/images/visit1.png','./assets/images/visit2.png','./assets/images/visit3.png'],
			currentVisior:0,
			sexShow:false,
			done:false,
			showPerson:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

	}

	render() {
		return (
			<div className={'lt-start-main-ui '+ (this.state.done?'active':'')} style={{height:this.viewH}}>
				<div className='lt-start-map' ref='lt-start-map' style={{width:this.state.imgWidth}}>
					<img ref='img' onLoad={this.imgLoad.bind(this)} src='./assets/images/start-bg.png'/>
					<img className='lt-door' src='./assets/images/door.png'/>
					<img className='lt-cloud' ref='cloud' src='./assets/images/cloud.png'/>
					{this.state.iNow > -1 && <div className='lt-talk'>
						<img src='./assets/images/vilidate-bg.png'/>
						<div>{this.state.steps[this.state.iNow]}</div>
					</div>}
				
				</div>

				<div className='lt-selected-sex' style={{display:this.state.sexShow?'block':'none'}}>
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
				<div className={'lt-visitor '+ (this.state.showPerson?'active':'')} ref='lt-visitor'>
						<img src={this.state.visitorList[this.state.currentVisior]}/>
				</div>
			</div>
		);
	}

	imgLoad(e){
		this.setState({imgWidth:e.target.width});
		var map = $(this.refs['lt-start-map']);
		var speed = 5;
		var startX = 0;
		var cloud = $(this.refs['cloud']);
		var visitor = $(this.refs['lt-visitor']);
		var step = 0 ;
		var iNow = 0;
		 
		this.timer = setInterval(()=>{

			//clearInterval(this.timer);
			startX+=speed;

			
			
			if(startX>this.state.imgWidth - this.viewW){
				startX = this.state.imgWidth - this.viewW;
				clearInterval(this.timer);

				this.setState({
					showPerson:true
				});

				var dtd = $.Deferred();

				var wait = (dtd)=>{
					 var tasks = ()=>{
					 	 dtd.resolve();
					 }

					 setTimeout(tasks,2000);
					 return dtd;
				}

				var t = setInterval(()=>{
						if(step % 8=== 0){
							step=0;
							iNow++;
						}

						if(iNow % 4=== 0){
							iNow=0;
						}

					this.setState({currentVisior:iNow});
					
					step++;
				},16);

				setTimeout(()=>{
						clearInterval(t);
						this.setState({currentVisior:1});
				},2000)


				$.when(wait(dtd)).done(()=>{
					this.setState({
						iNow:this.state.iNow + 1
					});
				}).done(()=>{
					setTimeout(()=>{
						this.setState({
							iNow:this.state.iNow + 1
						});
					},2000)
				}).done(()=>{
					setTimeout(()=>{
							this.setState({
								iNow:-1,
								sexShow:true
							});
					},4000);
				});
			}
			map.css({'-webkit-transform':'translate3d(-'+startX+'px,0,0)'});
			cloud.css({'-webkit-transform':'translate3d(-'+startX/3+'px,0,0)'});
			//
			
		},16);
	}

	selectedSex(index){

		if(!this.selected){
			this.selected = !this.selected;			
			window.obserable.on('getSex',()=>{
				return index;
			});
			$('.lt-sex-group div').eq(index-1).find('img').eq(1).addClass('active');
			setTimeout(()=>{
					this.setState({
					done:true
				});
				window.obserable.trigger({type:'showIntro'})
			},1000);
		}
	}


	componentDidMount() {
		
	}
}
export default PubCom(StartApp);