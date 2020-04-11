import React, { Component, Fragment } from "react";
import "./index.css";
import { myRequest } from "../../../../../function";
class Index extends Component {
  state={
    listLog:[] // 日志列表
  };
  // 获取任务详细
	tasklistLog() {
		let that = this;
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/task/" + this.props.lawyerId + "/task_log",
			auth: true,
			callback: function(response) {
				console.log(response);
				//处理返回结果
				if (response.data.code === 0) {
					that.setState({
						listLog:response.data.data
					});
				}
			}
		});
  }
  componentDidMount(){
    // this.tasklistLog(); // 日志列表
  }
	render() {
		return (
			<Fragment>
        {

        }
				<div>

        </div>
			</Fragment>
		);
	}
}
export default Index;
