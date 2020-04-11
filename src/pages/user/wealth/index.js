import React, { Component, Fragment } from 'react';
import './index.css';
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { Button, Icon, Select, TimePicker, Input } from 'antd';
import moment from 'moment';
const { Option } = Select;
const { Search } = Input;
//我的财富
class Index extends Component {
  state = {
    data: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
    ]
  }
  render() {
    return (
      <Fragment>
        <div className="my_treasure">
          {/* 我的金额 */}
          <div style={{ height: "100%", clear: "both" }}>
            {/* 我的收益 */}
            <div className="my_earnings">
              <span style={{ fontSize: "14px", color: "#fff", float: 'left' }}>我的余额:</span>
              <span style={{ fontSize: "14px", color: "#fff", float: 'right' }}>昨日收益:</span><br></br>
              <span style={{ fontSize: "14px", color: "#fff", float: 'left' }}>￥9999.99</span>
              <span style={{ fontSize: "14px", color: "#fff", float: 'right' }}>+100</span>
              <div style={{ float: 'right', marginTop: "60px" }}>
                <Button onClick={() => this.props.changePopupBox([{ type: "withdrawal" }])} type="primary">提现</Button>
                <Button onClick={() => this.props.changePopupBox([{ type: "recharge" }])} style={{ marginRight: "-31px", marginLeft: "15px" }} type="primary">充值</Button>
              </div>
            </div>
            {/* 曲线图 */}
            <div style={{ float: 'right' }}>
              <img
                style={{ width: "255px", height: "150px", marginRight: "15px" }}
                src={require("../../../statics/images/个人中心/line_chart.png")} alt="" />
              {/* 银行卡 */}
              <img
                style={{ width: "255px", height: "150px", boxSizing: "content-box" }}
                src={require("../../../statics/images/个人中心/bank_card.png")} alt="" />

            </div>
            <div className="alters">更改</div>
            <div className="clears3"></div>
          </div>

          {/* 历史账单 */}
          <div className="history_bill">
            <div className="type_bill">
              {/* 标题 */}
              <div className="you_type">
                <span style={{ fontSize: "14", color: "#333", fontWeight: 'bold' }}>历史账单</span>
                <Icon style={{ fontSize: "14", color: "#333", float: "right" }} type="ellipsis" />
              </div>
              {/* 搜索部分 */}
              <div style={{ marginTop: "10px" }}>
                <Select
                  // <Icon type="appstore" theme="twoTone" />
                  showSearch
                  style={{ width: 200 }}
                  placeholder="所有类型"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                <TimePicker style={{ width: 200, marginLeft: "20px" }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                <Search
                  placeholder="搜索关键词"
                  style={{ width: 200, marginLeft: "285px" }}
                />
              </div>
            </div>
            {this.state.data.map((item) => (
              <div className="running" key={item.id}>
                <span style={{ fontSize: "16px", color: "#333", marginLeft: "15px" }}>2019年9月</span>
                <span style={{ position: 'absolute', left: "830px", fontSize: "12px", color: "#ccc" }}>支出 ￥11000.00</span>
                <span style={{ position: 'absolute', left: "830px", top: "18px", fontSize: "12px", color: "#ccc" }}>收入 ￥12020.00</span>
                {/* 详细时间日期 */}
                <div className="detail_time">
                  <div className="money ">
                    <Icon type="dashboard" theme="twoTone" />
                    <span style={{ marginLeft: "8px" }}>9月19日</span>
                    <span style={{ marginLeft: "5px" }}>09:30</span>
                    <Icon style={{ marginLeft: "80px" }} type="appstore" theme="twoTone" />
                    <span style={{ marginLeft: "12px" }}>支付</span>
                    <span style={{ marginLeft: "80px" }}>【协同任务】支付-某某某的雇佣金</span>
                    <span style={{ marginLeft: "309px" }}>-1000.00</span>
                  </div>
                  <div style={{ marginTop: "15px" }} className="money ">
                    <Icon type="dashboard" theme="twoTone" />
                    <span style={{ marginLeft: "8px" }}>9月19日</span>
                    <span style={{ marginLeft: "5px" }}>09:30</span>
                    <Icon style={{ marginLeft: "80px" }} type="appstore" theme="twoTone" />
                    <span style={{ marginLeft: "12px" }}>收款</span>
                    <span style={{ marginLeft: "80px" }}>【协同任务】收款-某某某的付款</span>
                    <span style={{ marginLeft: "320px" }}>+1000.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
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

export default connect(
  null,
  mapDispath
)(Index);