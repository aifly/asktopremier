import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

class ShareApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			content:'',
			hymn:3321,
			showMask:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var style = {
			background:'url(./assets/images/share-question-bg.png) no-repeat center center',
			backgroundSize:'contain'
		}

		var maskStyle ={
		background:'url(./assets/images/arron1.png) no-repeat center center',
			backgroundSize:'cover',
			display:this.state.showMask?'block':'none'
		}
		return (
			<div className='lt-share-main-ui'>
				<div className='lt-share-top'>
					<img src='./assets/images/share-bg.png'/>
				</div>
				<div className='lt-share-text' style={style}>
					<div>{this.state.content}</div>
					<div className='lt-share-follow' onTouchTap={this.follow.bind(this)}>
						<img src='./assets/images/zan.png'/>
						<span>{this.state.hymn}</span>
					</div>
					
				</div>

				<aside className='lt-share-btn-group'>
					<section className='lt-share-btn' onTouchTap={this.follow.bind(this)}>
						<img src='./assets/images/ding.png'/>
					</section>
					<section className='lt-share-msg'>
						<a href='./'><img src='./assets/images/msg.png'/></a>
					</section>
				</aside>
				<div className='lt-mask' onTouchTap={()=>{this.setState({showMask:false})}} style={maskStyle}>

				</div>
			</div>
		);
	}

	follow(){
		var qid = this.getQueryString('qid');
		var s= this;
		$.ajax({
			url:window.baseUrl+'h5/click_hymn',
			data:{
				qid:qid
			},
			success(data){
				if(data.getret === 0){
					 	message.success(data.getmsg);
					 	s.setState({
					 		hymn:s.state.hymn+1
					 	})
				}
			}
		})
	}

	showMask(){
		this.setState({
			showMask:true
		});
		setTimeout(()=>{

			this.setState({
				showMask:false
			});
		},5000)
	}

	getCookie(cname){
		 var name = cname + "=";  
    var ca = document.cookie.split(';');  
    for(var i=0; i<ca.length; i++) {  
        var c = ca[i];  
        while (c.charAt(0)==' ') c = c.substring(1);  
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
    }  
    return "";
	}

	getQueryString(name){
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	    return null;
	}
	componentDidMount() {



		document.title = '我给总理提交了一份留言，来帮我顶一下吧！';

		if(this.getCookie('qid')){
			this.setState({
				showMask:true
			})
		}
		var qid = this.getQueryString('qid');
		var s = this;
		if(!qid){
			return;
		}
		$.ajax({
			url:window.baseUrl+'h5/get_question',
			data:{
				qid:qid
			},
			type:'post',
			success(data){
					if(data.getret  === 0 ){
						s.setState({
							content:data.question.content,
							hymn:data.question.hymn
						})
					}
			}
		})
	}
}
export default PubCom(ShareApp);