import React, { Component, Fragment } from 'react';
import './index.css';
import { Switch } from 'antd';
//个人设置
class Index extends Component {

  render() {

    return (
      <Fragment>
        <div className="personal">
          <div className="settle">
            <span style={{ fontSize: "16px", color: "#333" }}>整理案源</span>
            <Switch defaultChecked style={{ float: 'right' }} />
            <p style={{ fontSize: "14px", color: "#ccc" }}>案件简要说明,关于这些问题该要怎么处理</p>
          </div>
          <div className="take">
            <span style={{ fontSize: "16px", color: "#333" }}>接受咨询</span>
            <Switch defaultChecked style={{ float: 'right' }} />
            <p style={{ fontSize: "14px", color: "#ccc" }}>关闭后，您将不会收到任何法律咨询消息，也无法被搜索到</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;