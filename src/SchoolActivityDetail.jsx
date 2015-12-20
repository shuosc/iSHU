'use strict'
require("../style/css/ishu/Activity.css");
require("../style/css/ishu/Signup.css");
var React = require("react");
var cookie = require('react-cookie');
var { Card, CardTitle, CardText, CardActions, CircularProgress,
      Dialog, FlatButton, RaisedButton, Snackbar, Tabs, Tab, TextField } = require('material-ui');
var AppBar = require('./AppBar.jsx');
var SchoolDialog = require('./SchoolDialog.jsx');
var {render} = require('react-dom');
var InfiniteScroll = require('react-infinite-scroll')(React);
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// 校园活动详情
var SchoolActivityDetail= React.createClass({
  getInitialState: function() {
    return {
      messageText:[],
      username: [],
      hasMoreMessages: true
    };
  },
  loadMessageFromServer: function() {
    // console.log('action_id:'+this.props.ActionID);
    var data = {
        action_id: this.props.ActionID
      };
    setTimeout(function() {
      $.ajax({
        url: 'getcampusactionbyid',
        dataType: 'json',
        method: 'post',
        data: data,
        success: function(data) {
          var t_messageText = [];
          t_messageText.push({
            'All': data.All,
            'ActiveTime': data.ActiveTime,
            'Title': data.Title,
            'Url': data.Url,
            'Address': data.Address,
            'Auth': data.Auth,
            'Mark': data.Mark,
            'Current': data.Current,
            'Summary': data.Summary,
            'ActionType': data.ActionType,
            'Url': data.Url,
            'Address': data.Address,
            'Time': data.Time,
            'EndTime': data.EndTime,
          });
          // console.log(t_messageText);
          this.setState({
            messageText: t_messageText,
            hasMoreMessages: false
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      },1000);
    }.bind(this), 1000);
  },
  render: function() {
    var ActivityDetail = this.state.messageText.map(function (detail){
      var ActionType;
      if (detail.ActionType == '6') {ActionType='专题活动'}
      else if (detail.ActionType == '5') {ActionType='社团活动'} 
      else if (detail.ActionType == '4') {ActionType='招聘实习'}
      else if (detail.ActionType == '3') {ActionType='公益活动'}
      else if (detail.ActionType == '2') {ActionType='比赛活动'}
      else if (detail.ActionType == '1') {ActionType='讲座报告'}
      else {ActionType='其它'};
      // console.log(Summary);
      // var string ='abczxaeib';
      // string=string.replace("zx","\u000d\u000a");
      // console.log(this.props.ActionID);
      return (
        <div>
          <div className="activity-detail">
            <div>
              <p className="inline activity-detail-title">活动类别：</p>
              <p className="inline activity-category" >{ActionType}</p>
            </div>
            <div>
              <p className="activity-detail-title">活动简介：</p>
              <div className="activity-brief"><div dangerouslySetInnerHTML={{__html: detail.Summary}} /></div>
            </div>
            <br />
            <div>
              <p className="inline activity-detail-title">报名开始时间：</p>
              <p className="inline activity-time-begin">{detail.Time}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">报名截止时间：</p>
              <p className="inline activity-time-end">{detail.EndTime}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">人数限制：</p>
              <p className="inline activity-number">{detail.Current}/{detail.All}</p>
            </div>
            <div>
              <p className="inline activity-detail-title">报名状态：</p>
              <p className="inline activity-status">{detail.Status}</p>
            </div>
          </div>
          <SchoolDialog ActionID={this.props.ActionID} />
        </div>
      )
    }.bind(this));
    return (
      <InfiniteScroll
        loadMore={this.loadMessageFromServer}
        hasMore={this.state.hasMoreMessages}
        loader={<CircularProgress className="circular-progress" mode="indeterminate" size={0.8}/>}>
        {ActivityDetail}
      </InfiniteScroll>
    );
  }
});

module.exports = SchoolActivityDetail;
