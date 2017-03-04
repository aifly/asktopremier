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


		wxConfig(){

		  var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);

			$.ajax({
				url:'http://api.zmiti.com/weixin/jssdk.php',
				dataType:'jsonp',
				jsonp: "callback",
				data:{
					type:'signature',
					durl:durl
				},
		    jsonpCallback: "jsonFlickrFeed",
		    success(data){
		    	wx.config({
						    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						    appId: 'wxfacf4a639d9e3bcc', // 必填，公众号的唯一标识
						    timestamp:'1488558145' , // 必填，生成签名的时间戳
						    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
						    signature: data.signature,// 必填，签名，见附录1
						    jsApiList: [ 'checkJsApi',
													  'onMenuShareTimeline',
													  'onMenuShareAppMessage',
													  'onMenuShareQQ',
													  'onMenuShareWeibo',
													  'hideMenuItems',
													  'showMenuItems',
													  'hideAllNonBaseMenuItem',
													  'showAllNonBaseMenuItem'
								] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});

		    	wx.ready(()=>{
		    			 		//朋友圈
                    wx.onMenuShareTimeline({
                        title: "我给总理提交了一份留言，来帮我顶一下吧！", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/asktopremier/assets/images/300.jpg", // 分享图标
                        desc: "我给总理提交了一份留言，来帮我顶一下吧！",
                        success: function () { },
                        cancel: function () { }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: "我给总理提交了一份留言，来帮我顶一下吧！", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/asktopremier/assets/images/300.jpg", // 分享图标
                        type: "link",
                        dataUrl: "",
                        desc: "我给总理提交了一份留言，来帮我顶一下吧！",
                        success: function () { },
                        cancel: function () { }
                    });
                    //qq
                    wx.onMenuShareQQ({
                        title: "我给总理提交了一份留言，来帮我顶一下吧！", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/asktopremier/assets/images/300.jpg", // 分享图标
                        desc: "我给总理提交了一份留言，来帮我顶一下吧！",
                        success: function () { },
                        cancel: function () { }
                    });
		    	});
		    }


			});
		
	}

	componentDidMount() {

 		this.wxConfig();

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