import React, { Component, Fragment } from "react";
import "./index.css";
import {Input, Select, Card, Button, Icon, Pagination, message, Form} from "antd";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
//我的案件
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import {myRequest} from "../../../function";

class Index extends Component {
  state = {
    theme: "light",
    show: 0, //当前显示的描述框
    page : 1,//当前页码
    pageSize : 10,//每页显示数量
    total : 0,//数据总数
    data: [],//案件列表
  };

  //获取我的案件列表
  getMyCase(){
    const that = this,params={};

    params.state = 1;//正常的案件
    params.keyword = that.props.form.getFieldValue('keyword');//关键词搜索
    params.page = that.state.page;
    params.page_size = that.state.pageSize;

    //状态
    if(that.props.form.getFieldValue('status') !== 0){
      params.status = that.props.form.getFieldValue('status');
    }

    myRequest({
      method: "get",
      path: "/lawyer/efficiency/my_case/index",
      auth: true,
      params,
      callback: function(response) {
        //处理返回结果
        if (response.data.code !== 0) {
          message.error(response.data.msg);
        } else {
          const data = response.data.data;
          that.setState({
            data:data.list,
            page : parseInt(data.page,10),
            pageSize : parseInt(data.page_size,10),
            total : parseInt(data.total_count,10),
          })
        }
      }
    });
  }

  //显示隐藏的文字框
  showBox(id) {
    this.setState(() => ({
      show: id
    }));
  }

  //隐藏的文字框
  HideBox() {
    this.setState(() => ({
      show: 0
    }));
  }

  //修改页码
  changePage(page, pageSize){
    this.setState({
      page,
      pageSize
    },() => this.getData());
  }

  //修改显示数量
  changePageSize(current, size){
    this.setState({
      page : current,
      pageSize : size
    },() => this.getData());
  }

  //彻底删除案件
  deleteCase(id) {
    const that = this;

    myRequest({
      method: "delete",
      path: "/lawyer/efficiency/my_case/index/"+id,
      auth: true,
      callback: function(response) {
        //处理返回结果
        if (response.data.code !== 0) {
          message.error(response.data.msg);
        } else {
          message.success("彻底删除成功",1);
          that.getMyCase();
        }
      }
    });
  }

  //还原案件
  reductionCase(id){
    const that = this;

    myRequest({
      method: "put",
      path: "/lawyer/efficiency/my_case/index/"+id+"/reduction",
      auth: true,
      callback: function(response) {
        //处理返回结果
        if (response.data.code !== 0) {
          message.error(response.data.msg);
        } else {
          message.success("还原成功",1);
          that.getMyCase();
        }
      }
    });
  }

  //提交筛选表单
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getMyCase();
      }
    });
  };

  //初始化组件
  componentDidMount(){
    this.getMyCase()
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        {/* 案件内容 */}
        <div
          style={{
            width: 935,
            height: "100%",
            float: "right",
            marginLeft: 20,
            marginTop: 40
          }}
        >
          {/* 内容搜索部分 */}
          <div
            style={{
              backgroundColor: "#fff",
              height: 70,
              borderRadius: 4,
              paddingTop:20,
              paddingLeft:20,
            }}
          >
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('status', {})(
                  <Select
                    placeholder="状态"
                    style={{ width: 200 }}
                  >
                    <Select.Option key={0}>全部状态</Select.Option>
                    <Select.Option key={1}>立案</Select.Option>
                    <Select.Option key={2}>诉前联调</Select.Option>
                    <Select.Option key={3}>一审</Select.Option>
                    <Select.Option key={4}>二审</Select.Option>
                    <Select.Option key={5}>结案</Select.Option>
                    <Select.Option key={6}>执行</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('keyword', {})(
                  <Input.Search
                    placeholder="输入关键词"
                    enterButton="搜索"
                  />
                )}
              </Form.Item>

            </Form>
          </div>

          {/* 卡片案件类型区域 */}
          <div style={{ marginTop: 20, height: "100%" }}>
            <div style={{ height: 40 }}>
              <span className="partys">案件回收站</span>
            </div>

            {this.state.data.map((item, index) => (
              <div
                onMouseEnter={() => this.showBox(item.id)}
                onMouseLeave={() => this.HideBox()}
                key={item.id}
              >
                <Card
                  className="cards"
                  hoverable
                  style={{	width: 300,marginBottom: 30,marginRight: (index + 1) % 3 === 0 ? 0 : 17}}
                >
                  <p className="details">{item.name}</p>
                  <Icon
                    className="deletets"
                    type="delete"
                    theme="twoTone"
                    onClick={() => this.deleteCase(item.id)}
                  />
                  <Icon
                    type="folder-open"
                    theme="twoTone"
                    className="file_icon"
                    onClick={() => this.reductionCase(item.id)}
                  />
                  <Button size="small" className="" type="primary">
                    {item.status_plan}
                  </Button>
                  <p className="conterns">案件内容：</p>
                  <p className="myconten">
                    {item.describe}
                  </p>
                  <div style={{ marginTop: 30,marginBottom: "7px", }}>
                    <p style={{ color: "#393E46", fontSize: "12px" }}>
                      当事人：{item.litigant}
                    </p>
                    <p
                      style={{
                        color: "#CCCCCC",
                        fontSize: "12px"
                      }}
                    >
                      {item.created}
                    </p>
                  </div>
                  <CSSTransition
                    in={(this.state.show === item.id) ? true : false}
                    timeout={300}
                    unmountOnExit
                    classNames="slide-consult"
                  >
                    <div className="lawyer_box_btn pos-a">
                      <div>
                        <Link to={"/case_center/detail/"+item.id+"/index"}>
                          <Button ghost className="consult-btn">查看案件</Button>
                        </Link>
                      </div>
                    </div>
                  </CSSTransition>
                </Card>
              </div>
            ))}
            {/* 分页 */}
            <Pagination
              total={this.state.total}
              pageSize={this.state.pageSize}
              current={this.state.page}
              onChange={(page, pageSize) => this.changePage(page, pageSize)}
              onShowSizeChange={(current, size) => this.changePageSize(current, size)}
              showSizeChanger
              showQuickJumper
              style={{float:'right'}}
            />
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

Index = Form.create()(Index);
Index = connect(null, mapDispath)(Index);

export default Index;
