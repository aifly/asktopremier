import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import IScroll from 'iscroll';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';  
import RankingListApp from '../rankinglist/index.jsx';
import $ from 'jquery';


class DialogApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			visiable:false,
			currentClassName:'办事效率',
			currentClassId:1,
			isAsk:false,//是否显示提问对话框
			isSend:false,
			questionList:[
				
			]
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var liStyle = {
			background:' url(./assets/images/question-bg.png) no-repeat center',
			backgroundSize:'contain'
		}

		var inputStyle=  {
			background:'url(./assets/images/ask-bg.png) no-repeat center center',
			backgroundSize:'contain'
		}

		return (
			<div  className='lt-dialog-main-ui lt-dialog-3d-scene' style={{display:this.state.visiable?'block':'none'}}>
				<section className={'lt-3dbox '+ (this.state.isAsk?'active':'')}>
					<artile>
						<div className='lt-dialog-close' onTouchTap={(e)=>{e.preventDefault();this.setState({visiable:false})}}></div>
						<div className='lt-dialog-top-eara'>
							<div className='lt-dialog-title'><span>{this.state.currentClassName}</span><span>留言厅</span></div>
							<img className='lt-meeting' src='./assets/images/meeting.png'/>
							<img className='lt-logo' src='./assets/images/logo.png'/>
							<RankingListApp></RankingListApp>
						</div>
						<div className='lt-question-scroll' >

							<div className='lt-ask-btn' onTouchTap={()=>{this.setState({isAsk:true})}}>我要留言</div>
							<div className='lt-info-text'>
								<div>还没想好说点什么吗？</div>
								<div>不如先看看其他网友的留言吧</div>
							</div>
							<div className='lt-question-scroll-C' ref='lt-question-scroll-C' style={{height:this.state.scrollHeight}}>
								<ul>
									{this.state.questionList.map((item,i)=>{
										return <li key={i} style={liStyle}>
											<div className="lt-question-content">{item.content}</div>
											<span className='lt-friend'>网友{item.qid}</span>
											<span className='lt-follow' onTouchTap={this.follow.bind(this,item.qid)}><img src='./assets/images/zan.png'/><span>{item.hymn}</span></span>
										</li>
									})}
								</ul>
							</div>
						</div>
					</artile>
					<artile>
						<div className='lt-dialog-close' onTouchTap={()=>{this.setState({visiable:false,isAsk:false})}}></div>
						<h2 className="lt-ask-title">我要留言</h2>
						<div className="lt-ask-input" style={inputStyle}>
							<textarea placeholder='请输入您关心的问题，最多90个字' ref='lt-question-input' tabIndex={-1}></textarea>
						</div>
						<div className="lt-btn-group">
							<a href="javascript:void(0)" onTouchTap={()=>{this.setState({isAsk:false,visiable:false})}}>继续看看</a>
							<a href="javascript:void(0)" onTouchTap={this.addQuestion.bind(this)}>确认提交</a>
						</div>
						<div className="lt-ask-text">
							“你留言我转达”——即日起至全国两会期间，新华社客户端联合国务院客户端推出“想给总理捎句话”留言征集活动，你的留言，有可能在两会结束后的总理记者会上通过新华社记者向总理提出。
						</div>
						<div className="lt-ask-logo">
							<img src="./assets/images/logo.png"/>
						</div>
					</artile>

					{this.state.isSend && <div className='lt-send'>
											<img src='./assets/images/2.gif'/>
									</div>}

				</section>


			</div>
		);
	}


	follow(qid){
		
		var s= this;
		$.ajax({
			url:window.baseUrl+'h5/click_hymn',
			data:{
				qid:qid
			},
			success(data){
				if(data.getret === 0){
					 	message.success(data.getmsg);
					 	s.state.questionList.forEach((item,i)=>{
					 			if(item.qid === qid){
					 				item.hymn = item.hymn + 1;
					 			}
					 	})
					 	s.forceUpdate();
				}
			}
		})
	}

	addQuestion(){
		var value = this.refs['lt-question-input'].value;
		var s=  this;
		if(value.length <= 0){
			//console.log(message);
			message.error('问题内容不能为空');
			 return;
		}
		if(value.length>90){
			message.error('请简化一下您的问题内容，90个字以内。');
			return;
		}
		$.ajax({
			url:window.baseUrl + '/h5/add_question',
			type:"POST",
			data:{
				sex:window.obserable.trigger({type:'getSex'}) === undefined? 1 :window.obserable.trigger({type:'getSex'}),
				content:value,
				hymn:1,
				classid:s.state.currentClassId,
				sort:1
			},
			success(data){
				message[data.getret === 0?'success':'error'](data.getmsg);
				s.refs['lt-question-input'].value = '';
				if(data.getret === 0){
					s.setState({
						isAsk:false,
						isSend:true
					});

					setTimeout(()=>{
						s.setState({
							isSend:false
						});


						window.obserable.trigger({type:'showSubmit',data:{classid:s.state.currentClassId,classname:s.state.currentClassName,hymn:data.totalnum,qid:data.qid}})
						window.obserable.trigger({type:'closeDialog'});

					},1500)

					
				}
			}
		});
	}

	componentDidMount() {

		window.obserable.on('closeDialog',()=>{
			this.setState({visiable:false});
		});
		var s = this;
		window.obserable.on('showDialog',(opt)=>{
			this.setState({
				visiable:true,
				currentClassId:opt.classid,
				currentClassName:opt.classname
			});
			
			$.ajax({
				url:window.baseUrl+'h5/get_validquestion//',
				data:{
					classid:opt.classid
				},
				success(data){
					if(data.getret === 0){
						s.state.questionList = data.questionlist;

						s.state.scrollHeight = s.viewH - $('.lt-question-scroll-C').offset().top
						
						s.forceUpdate(()=>{
							setTimeout(()=>{
								s.scroll = new IScroll(s.refs['lt-question-scroll-C'],{})
							},100)
						});
					}
				}

			})
		});
	}
}
export default PubCom(DialogApp);