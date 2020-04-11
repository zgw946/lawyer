import React, { PureComponent } from "react";
import "./index.css";
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Input, Checkbox, DatePicker, Icon, Button } from "antd";
const { TextArea } = Input;
//移动或复制文件
class Index extends PureComponent {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Modal
        style={{ width: "500px", clear: "both", marginTop: "60px" }}
        destroyOnClose={true}
        footer={null}
        onCancel={() =>
          this.props.changePopupBox([{ type: this.props.popupType }])
        }
        visible={true}
      >
        <h2
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
            paddingTop: "10px"
          }}
        >
          创建日程
        </h2>
        <div>
          <TextArea
            placeholder="请输入日程标题"
            style={{
              width: "400px",
              resize: "none",
              margin: "10px",
              marginLeft: "35px"
            }}
            rows={4}
          />
        </div>
        <span style={{ marginLeft: "35px", color: "#333" }}>置顶</span>
        <Checkbox style={{ marginLeft: "10px" }}></Checkbox>
        <div>
          <DatePicker
            className="tiemshow"
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="开始时间"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <span>&nbsp;-&nbsp;</span>
          <DatePicker
            disabledDate={this.disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="结束时间"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
        <span style={{ marginLeft: "35px", color: "#333" }}>全天</span>
        <Checkbox style={{ marginLeft: "10px" }}></Checkbox>
        <br></br>
        <span style={{ marginLeft: "35px", color: "#333", marginTop: "10px" }}>
          关联任务：
        </span>
        <Icon style={{ marginTop: "12px" }} type="plus" />
        <br></br>
        <span style={{ marginLeft: "35px", color: "#333", marginTop: "10px" }}>
          关联文件：
        </span>
        <Button
          size="small"
          style={{
            backgroundColor: "#2e3341",
            color: "#fff",
            marginLeft: "10px",
            marginTop: "10px"
          }}
        >
          添加
        </Button>
        <div style={{ height: 68, margin: "20px" }}>
          <Button
            style={{
              backgroundColor: "#2e3341",
              color: "#fff",
              marginLeft: "168px",
              marginTop: "10px",
              width: "80px"
            }}
          >
            确认
          </Button>
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
