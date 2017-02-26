import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class RankingListApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			visiable:false,
			rankingList:[
				{classname:'房子',num:12999,scale:1},
				{classname:'就医',num:7000,scale:1},
				{classname:'养老',num:6000,scale:1},
				{classname:'钱包',num:5000,scale:1},
				{classname:'教育',num:4000,scale:1},
				{classname:'交通',num:3000,scale:1},
				{classname:'食品',num:2500,scale:1},
				{classname:'户口本',num:2000,scale:1},
				{classname:'办事效率',num:1600,scale:1},
				{classname:'反腐',num:1300,scale:1}
			]	
		};

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

		return (
			<div className='lt-ranking-main-ui'>
				<div className='lt-question-order' onTouchTap={this.displayRankingList.bind(this)}>排行榜</div>
				<section className={'lt-ranking-list-C '+ (this.state.visiable?'active':'')}>
					<div className='lt-dialog-close' onTouchTap={(e)=>{e.preventDefault();this.setState({visiable:false})}}></div>
					<h2>排行榜</h2>
					<div>
						<ul>
							{this.state.rankingList.map((item,i)=>{

								return <li key={i}>
									<div>{i+1}.</div>
									<div>{item.classname}</div>
									<div>
										<span>{item.num}</span>
										<span style={{width:(item.scale||1)*100+'%'}}></span>
									</div>
								</li>
							})}
						</ul>
					</div>

				</section>
			</div>
			
		);
	}

	displayRankingList(){
		this.setState({visiable:true});
		var s = this;
		$.ajax({//开始请求
			url:window.baseUrl+'h5/get_hotclass/',
			data:{},
			type:'post',
			success(data){
					if(data.getret === 0){
						var iNow = 0;
						data.hotlist.forEach((item,i)=>{
								s.cate.forEach((cate,k)=>{
									 if(item.classid === cate.classid){
									 		s.state.rankingList[i].classname = cate.classname;
									 		s.state.rankingList[i].num = item.num;
									 		iNow++;
									 }
								});
						});

						for(var i = 0;i< 10 - iNow;i++){
							s.state.rankingList.pop();
						}
						s.computeScale();
					}
			}
		})
	}

	computeScale(){
		var hymnNum = 0;
		this.state.rankingList.forEach((item,i)=>{
			hymnNum += item.num;
		});
		this.state.rankingList.forEach((item,i)=>{
			item.scale = item.num / hymnNum * 1;
		});
		this.forceUpdate();
	}



	componentDidMount() {
		
	}
}
export default PubCom(RankingListApp);