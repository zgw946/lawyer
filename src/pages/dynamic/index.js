import React, { Component, Fragment } from "react";
import "./index.css";
import connect from "react-redux/lib/connect/connect";
import { changePopupBox } from "../../components/layout/popup/actionCreators";
import { changeSessionType } from "./store/actionCreators";
import { getUserInfo } from "../../components/layout/header/actionCreators";
import { myRequest } from "../../function";
import moment from "moment";
import Consultant from "./consultant"; //法律顾问
import Attorney from "./attorney"; //律师对话
import System from "./system"; //系统消息
import { Avatar, Badge, Empty } from "antd";// antd

//设置日期输出格式
moment.locale('zh-cn', {
  calendar : {
    sameDay: 'HH:mm',
    nextDay: '[明天] HH:mm',
    nextWeek: '[下个]dddd HH:mm',
    lastDay: '[昨天] HH:mm',
    lastWeek: '[上个]dddd HH:mm',
    sameElse: 'YYYY年MM月DD日 HH:mm'
  }
});

class Index extends Component {
  state = {
    selected: 0,//选择的ID
    type :0,//选中的类型
    object :null,//选中的对象
    conversations: [] // 会话列表
  };

  //获取会话列表
  getConversationList() {
    let that = this;
    myRequest({
      method: "get",
      path: "/lawyer/conversation/index",
      auth: true,
      callback: function (response) {
        if (response.data.code === 0) {
          that.setState({
            conversations: response.data.data
          });
        }
      }
    });
  }

  //选择会话
  selectConversation(id,type,object) {
    this.setState({
      selected: id,
      type,
      object
    },() => this.getConversationList());
  }

  componentDidMount() {
    this.getConversationList();

    //设置定时拉取会话列表
    const interval = setInterval(() => this.getConversationList(),5000);
    this.setState({
      interval
    });
  }

  componentWillUnmount(){
    window.clearInterval(this.state.interval);
  }

	render() {

		return (
			<Fragment>
				<div className="dynamics">
					{/* {整个大容器} */}
					<div className="chat_Consulting">
						{/*左边部分*/}
						<div className="chats">
							{this.state.conversations.map(item => (
                <div
                  key={item.id}
                  className={this.state.selected === item.id ? "counselor " : "btnnum counselor_hover"}
                  onClick={() => this.selectConversation(item.id,item.type,item.object)}
                >
									<Badge count={item.new_num} className="mt16 ml2">
										{(() => {
											switch (item.type) {
												case 1://律师咨询
													return (
														<Avatar src={item.object.head_img} shape="square" icon="user"/>
													);
												case 4://消息通知
													return (
														<Avatar shape="square" icon="message"/>
													);
												case 5://我的助理
													return (
														<Avatar shape="square" icon="robot"/>
													);
												default:
													break;
											}
										})()}
									</Badge>
									<span className="span_counselor">{item.object.name}</span>
									{
										item.last_content ? (
											<Fragment>
												<span className="time_counselor">
													{moment(item.last_content_time).calendar()}
												</span>
												<p className="p_counselor">{item.last_content}</p>
											</Fragment>
										) : null
									}
								</div>
							))}
						</div>
						<div className="windows">
							{(() => {
								switch (this.state.type) {
									case 1: // 律师对话
										return <Attorney conversationId={this.state.selected} conversationObj={this.state.object}/>;
									case 4: //系统消息
										return <System />;
									case 5: //法律顾问
										return <Consultant />;
									default:
										return (
											//默认状态空
											<div className="ematy">
												<Empty />
											</div>
										);
								}
							})()}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapState = state => {
	return {
		userInfo: state.getIn(["header", "userInfo"]), //用户信息
		session: state.getIn(["index", "session"]) //聊天会话信息
	};
};
const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		},
		// 改变会话
		changeSessionType(info) {
			dispath(changeSessionType(info));
		},
		//设置用户信息
		getUserInfo() {
			dispath(getUserInfo());
		}
	};
};

export default connect(mapState, mapDispath)(Index);
