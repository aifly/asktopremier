import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IScroll from 'iscroll';
import MapApp from './map/index.jsx';
import DialogApp from './dialog/index.jsx';
import StartApp from './start/index.jsx';
import IntroduceApp from './introduce/index.jsx';
import SubmitApp from './submit/index.jsx';
import ShareApp from './share/index.jsx';
import  $ from 'jquery';
import Obserable from './assets/js/obserable';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

window.obserable = new Obserable();

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {

		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}		
	render() {
	
		return (
				<div className="lt-main-ui">
					<StartApp></StartApp>
					<IntroduceApp></IntroduceApp>
					<MapApp></MapApp>
					<DialogApp></DialogApp>
					<SubmitApp></SubmitApp>
					
				</div>
			)
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
                        title: "想给总理捎句话", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/asktopremier/assets/images/300.jpg", // 分享图标
                        desc: "想给总理捎句话",
                        success: function () { },
                        cancel: function () { }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: "想给总理捎句话", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/asktopremier/assets/images/300.jpg", // 分享图标
                        type: "link",
                        dataUrl: "",
                        desc: "想给总理捎句话",
                        success: function () { },
                        cancel: function () { }
                    });
                    //qq
                    wx.onMenuShareQQ({
                        title: "想给总理捎句话", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/asktopremier/assets/images/300.jpg", // 分享图标
                        desc: "想给总理捎句话",
                        success: function () { },
                        cancel: function () { }
                    });
		    	});
		    }


			});
		
	}

	componentDidMount(){
		this.wxConfig();
		$(document).one('touchstart',()=>{
				$('#audio')[0].play();
		});
		$('.lt-play').on('touchstart',()=>{
			if($('#audio')[0].paused){
					$('#audio')[0].play();
			}
			else{
				$('#audio')[0].pause();	

				$('.lt-play').removeClass('active');
			}
		})
		$('#audio').on('play',()=>{
			$('.lt-play').addClass('active');
		})

		$.ajax({
			url:window.baseUrl+'/h5/update_pvnum/',
			type:"POST",
			data:{
				productid:'957fdef3-fa98-11e6-beb7-c869cda336f9'
			},
			success(data){
				if(data.getret === 0){
					
				}
			}
		})
	}
}


 ReactDOM.render(<App/>,document.getElementById('fly-main'));