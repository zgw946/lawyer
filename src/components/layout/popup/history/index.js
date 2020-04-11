import React, { PureComponent } from "react";
import "./index.css";
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Select, Empty } from "antd";
import jsonp from "fetch-jsonp";
import querystring from "querystring";

const { Option } = Select;
let timeout;
let currentValue;

function fetch(value, callback) {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	currentValue = value;

	function fake() {
		const str = querystring.encode({
			code: "utf-8",
			q: value
		});
		jsonp(`https://suggest.taobao.com/sug?${str}`)
			.then(response => response.json())
			.then(d => {
				if (currentValue === value) {
					const { result } = d;
					const data = [];
					result.forEach(r => {
						data.push({
							value: r[0],
							text: r[0]
						});
					});
					callback(data);
				}
			});
	}

	timeout = setTimeout(fake, 300);
}
class Index extends PureComponent {
	state = {
		data: [],
		value: undefined
	};

	handleSearch = value => {
		if (value) {
			fetch(value, data => this.setState({ data }));
		} else {
			this.setState({ data: [] });
		}
	};

	handleChange = value => {
		this.setState({ value });
	};
	render() {
		const options = this.state.data.map(d => (
			<Option key={d.value}>{d.text}</Option>
		));
		return (
			<Modal
				width={400}
				style={{ marginTop: "230px", height: "350px" }}
				title="聊天记录"
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				{/* <h2 style={{ color: "#333", fontWeight: "bold" }}>收藏对话</h2> */}
				<div style={{ height: "200px" }}>
					<Select
						showSearch
						value={this.state.value}
						placeholder={this.props.placeholder}
						style={this.props.style}
						defaultActiveFirstOption={false}
						showArrow={false}
						filterOption={false}
						onSearch={this.handleSearch}
						onChange={this.handleChange}
						notFoundContent={null}
					>
						{options}
					</Select>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} o />
				</div>
			</Modal>
		);
	}
}

const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		}
	};
};

//数据仓库
Index = connect(null, mapDispath)(Index);

export default Index;
