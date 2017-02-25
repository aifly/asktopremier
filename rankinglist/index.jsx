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
				{classname:'房子',hymn:12999,scale:1},
				{classname:'就医',hymn:7000,scale:1},
				{classname:'养老',hymn:6000,scale:1},
				{classname:'钱包',hymn:5000,scale:1},
				{classname:'教育',hymn:4000,scale:1},
				{classname:'交通',hymn:3000,scale:1},
				{classname:'食品',hymn:2500,scale:1},
				{classname:'户口本',hymn:2000,scale:1},
				{classname:'办事效率',hymn:1600,scale:1},
				{classname:'反腐',hymn:1300,scale:1}
			]	
		};
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
										<span>{item.hymn}</span>
										<span style={{webkitTransform:'scale('+item.scale+',1)'}}></span>
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
		/*$.ajax({//开始请求

		})*/
	}


	componentDidMount() {
		var hymnNum = 0;
		this.state.rankingList.forEach((item,i)=>{
			hymnNum += item.hymn;
		});
		this.state.rankingList.forEach((item,i)=>{
			item.scale = item.hymn / hymnNum * 3;
		});
		this.forceUpdate();
	}
}
export default PubCom(RankingListApp);