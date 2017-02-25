import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ShareApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			content:'中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国',
			hymn:3321
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var style = {
			background:'url(./assets/images/share-question-bg.png) no-repeat center center',
			backgroundSize:'contain'
		}

		return (
			<div className='lt-share-main-ui'>
				<div className='lt-share-top'>
					<img src='./assets/images/share-bg.png'/>
				</div>
				<div className='lt-share-text' style={style}>
					<div>{this.state.content}</div>
					<div className='lt-share-follow'>
						<img src='./assets/images/zan.png'/>
						<span>{this.state.hymn}</span>
					</div>
					
				</div>

				<aside className='lt-share-btn-group'>
					<section className='lt-share-btn'>
						<img src='./assets/images/ding.png'/>
					</section>
					<section className='lt-share-msg'>
						<img src='./assets/images/msg.png'/>
					</section>
				</aside>
			</div>
		);
	}


	componentDidMount() {

	}
}
export default PubCom(ShareApp);