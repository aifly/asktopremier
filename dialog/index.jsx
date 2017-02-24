import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import IScroll from 'iscroll';
import $ from 'jquery';
class DialogApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			visiable:true,
			currentClassName:'办事效率',
			isAsk:true,
			questionList:[
				{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				},{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				},{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				},{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				},{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				},{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				},{
					qid:1,
					content:'欢欢迎收看本期的[一周热评]！上周，小岳岳泡上了好妹妹，情人节发布合作单曲《送情郎》；Bruno Mars新专全碟上线，感受火星老仙的无边魅力；打雷姐Lana Del Rey发布新单',
					className:'办事效率',
					hymn:'1012',
				}
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
							<div className='lt-dialog-title'>新华社记者</div>
							<div className='lt-dialog-title'><span>{this.state.currentClassName}问题</span><span>讨论组</span></div>
							<img className='lt-meeting' src='./assets/images/meeting.png'/>
							<img className='lt-logo' src='./assets/images/logo.png'/>
							<div className='lt-question-order'>排行榜</div>
						</div>
						<div className='lt-question-scroll' >

							<div className='lt-ask-btn' onTouchTap={()=>{this.setState({isAsk:true})}}>我要提问</div>
							<div className='lt-info-text'>
								<div>还没想好问什么吗？</div>
								<div>不如先看看其他网友提的问题吧</div>
							</div>
							<div className='lt-question-scroll-C' ref='lt-question-scroll-C' style={{height:this.state.scrollHeight}}>
								<ul>
									{this.state.questionList.map((item,i)=>{
										return <li key={i} style={liStyle}>
											<div className="lt-question-content">{item.content}</div>
											<span className='lt-friend'>网友{item.qid}</span>
											<span className='lt-follow'><img src='./assets/images/zan.png'/><span>{item.hymn}</span></span>
										</li>
									})}
								</ul>
							</div>
						</div>
					</artile>
					<artile>
						<div className='lt-dialog-close' onTouchTap={()=>{this.setState({visiable:false})}}></div>
						<h2 className="lt-ask-title">我要提问</h2>
						<div className="lt-ask-input" style={inputStyle}>
							<textarea tabIndex={-1}></textarea>
						</div>
						<div className="lt-btn-group">
							<a href="javascript:void(0)" onTouchTap={()=>{this.setState({isAsk:false})}}>取消</a>
							<a href="javascript:void(0)">确认提交</a>
						</div>
						<div className="lt-ask-text">
							“你留言我转达”——即日起至全国两会期间，新华社客户端联合中国政府网推出“我向总理说句话”留言征集活动，我们会收集最有建设性、最热的留言，在两会结束的时候通过新华社记者向总理提问提出。
						</div>
						<div className="lt-ask-logo">
							<img src="./assets/images/logo.png"/>
						</div>
					</artile>
				</section>
			</div>
		);
	}
	componentDidMount() {
		this.setState({
			scrollHeight:this.viewH - $('.lt-question-scroll-C').offset().top
		});
		setTimeout(()=>{
			this.scroll = new IScroll(this.refs['lt-question-scroll-C'],{

			})
		},100)
	}
}
export default PubCom(DialogApp);