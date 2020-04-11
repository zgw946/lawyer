import React, { Component, Fragment } from "react";
import Loadable from "react-loadable";
import Loading from "../../../components/common/loading/index";
import { Menu } from "antd";

//引入组件
const Detail = Loadable({
  loader: () => import("./index/index"),
  loading: Loading
}); //案件详情
const Materials = Loadable({
  loader: () => import("./materials"),
  loading: Loading
}); //案件材料
const Members = Loadable({
  loader: () => import("./members"),
  loading: Loading
}); //案件成员
const Schedule = Loadable({
  loader: () => import("./schedule"),
  loading: Loading
}); //案件日程
const Task = Loadable({
  loader: () => import("./task"),
  loading: Loading
}); //案件任务
const Log = Loadable({
  loader: () => import("./log"),
  loading: Loading
}); //案件操作日志

class Index extends Component {
  state = {
    selected: "index",
  };

  render() {

    const id = this.props.match.params.id;//案件ID
    const {selected} = this.state;//选中的菜单

    return (
      <Fragment>
        {/* <!-- 变换部分 --> */}
        <div style={{ height: "70px", marginBottom: 50, borderRadius: "8px" }}>
          <Menu
            style={{
              width: 935,
              float: "right",
              borderRadius: "8px",
              marginLeft: 20,
              marginTop: 40,
              height: "70px",
              paddingLeft: 20,
              lineHeight: "70px"
            }}
            defaultSelectedKeys={["index"]}
            selectedKeys={[selected]}
            onSelect={nav => this.tabmeun(nav)}
            mode="horizontal"
          >
            <Menu.Item key="index">
              信息
            </Menu.Item>
            <Menu.Item key="materials" >
              材料
            </Menu.Item>
            <Menu.Item key="task">
              任务
            </Menu.Item>
            <Menu.Item key="members">
              成员
            </Menu.Item>
            <Menu.Item key="schedule">
              日程
            </Menu.Item>
            <Menu.Item key="log">
              记录
            </Menu.Item>
          </Menu>
        </div>
        {
          (()=>{
            switch (selected) {
              case "index"://案件详情
                return <Detail caseId={id}/>;
              case "materials"://案件材料
                return <Materials caseId={id}/>;
              case "task"://案件任务
                return <Task caseId={id}/>;
              case "members"://案件成员
                return <Members caseId={id}/>;
              case "schedule"://案件日程
                return <Schedule caseId={id}/>;
              case "log"://案件日志
                return <Log caseId={id}/>;
              default:
                break;
            }
          })()
        }
      </Fragment>
    );
  }
  // 切换
  tabmeun(nav) {

    this.setState({
      selected: nav.key
    });
  }
}

export default Index;
