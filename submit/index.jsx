import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import RankingListApp from '../rankinglist/index.jsx';

class SubmitApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			className:'办事效率',
			questionNum:123,
			show:false,
			qid:-1

		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var resultTextStyle = {
			background:'url(./assets/images/commit-result.png) no-repeat center center',
			backgroundSize:"contain"
		}
		return (
			<div className={'lt-submit-main-ui '+ (this.state.show?'active':'')}>
				<div className='lt-submit-top'>

					<img src='./assets/images/commit-bg.png'/>
					<div className='lt-submit-result-text' style={resultTextStyle}>
						<span>{this.state.className}</span>
						<span>{this.state.questionNum}</span>
					</div>
					<div className='lt-submit-logo'>
						<img src='./assets/images/logo.png'/>
					</div>
					<RankingListApp></RankingListApp>
				</div>
				<div className='lt-submit-text-C'>
					<div>快来邀请好友助力吧！</div>
					<div>成为最热留言，</div>
					<div>就有机会获得总理亲自回答哦！</div>
				</div>
				<div className='lt-exciting'>
					<img src='./assets/images/jidong.png'/>
				</div>
				<div className='lt-submit-btn-C'>
					<a href={'./share.html?qid='+this.state.qid} onTouchTap={this.ding.bind(this)}>邀请好友顶一下</a>
					<a href='javascript:void(0)' onTouchTap={this.closeDialog.bind(this)}>不急，继续看看</a>
				</div>
			</div>
		);
	}

 setCookie(cname, cvalue, exdays){
     var d = new Date();  
      d.setTime(d.getTime() + (60*1000));  
      var expires = "expires="+d.toUTCString();  
      document.cookie = cname + "=" + cvalue + "; " + expires;  
  }

	ding(){
		 this.setCookie('qid',this.state.qid,null);
	}

	closeDialog(){
		
		window.obserable.trigger({
			type:'closeDialog'
		});
		this.setState({
			show:false
		})
	}

	componentDidMount() {
		window.obserable.on('showSubmit',(opt)=>{
			this.setState({
				show:true,
				className:opt.classname,
				questionNum:opt.hymn,
				qid:opt.qid
			})
		});
	}
}
export default PubCom(SubmitApp);