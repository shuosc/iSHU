'use strict'
const React =require('react');
const {Link, RouteHandler} = require('react-router');
const {AppBar, IconButton, LeftNav, MenuItem} = require('material-ui');
const {ActionSearch} = require('../../public/js/svg-icons.js');
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const HeadBar = React.createClass({
	getDefaultProps: function() {
		return {
			title: '乐乎问吧',
			url:'categories'
		};
	},
	getInitialState: function(){
		return {
			categories: []
		};
	},
	loadCategoriesFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			methods: 'get',
			success: function(data) {
				let t_categories = [];
				for (let obj in data.Data){
					console.log(data.Data[obj]);
					t_categories.push({
						'id': data.Data[obj].ID,
						'name': data.Data[obj].Name
					});
				}
				// console.log(data);
				// console.log(t_categories);
				this.setState({ categories: t_categories });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function() {
		this.loadCategoriesFromServer();
	},

	_toggleLeftNav: function() {
		this.refs.leftNav.toggle();
	},

	render: function() {
		// var sectorNodes = this.state.sectors.map(function (sector) {
		// 	var string="/home/"+sector.key;
		// 	return (
		// 		 <ul className="dropdown-menu">
		// 		 	<li key={sector.key} value= {sector.name}><Link to={string}>{sector.name}</Link></li>
		// 		 </ul>
		// 		);
		// });
		let menuItems = [
		  { route: 'home', text: '首  页' },
		  { route: 'login', text: '登  陆' },
		  { type: MenuItem.Types.SUBHEADER, text: '分类板块' },
		  {
		     type: MenuItem.Types.LINK,
		     payload: 'https://github.com/callemall/material-ui',
		     text: 'GitHub'
		  },
		];
		return (
			<div>
				<AppBar
				  title={this.props.title}
					onLeftIconButtonTouchTap={this._toggleLeftNav} />
				<LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
			</div>
		);
	}
});

module.exports = HeadBar;
