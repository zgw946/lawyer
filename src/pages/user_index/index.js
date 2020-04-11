import React, { Component, Fragment } from "react";
import "./index.css";
import { changePopupBox } from "../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { Tabs, Avatar, Button, Icon, Pagination, Divider } from "antd";

const { TabPane } = Tabs;
//用户基本信息
class Index extends Component {
	// 中间内容切换部分
	state = {
		current: "mail",
		data: [
			{
				id: 1
			},
			{
				id: 2
			},
			{
				id: 3
			}
    ],
    type_plan:"", // 实习律师
    head_img:"", //头像
    name:"", // 名字
    id_card:"",// 身份证号
    city:"" //城市
    
	};

	handleClick = e => {

		this.setState({
			current: e.key
		});
	};
	render() {
		const { userInfo } = this.props; //用户信息
		return (
			<Fragment>
				{/* 最外层大盒子 */}
				<div style={{ backgroundColor: "#f7f7f7" }}>
					{userInfo ? (
						<div className="userNames">
							{/* 用户信息部分 */}
							<div className="userMessage">
								<Button
									size="small"
									style={{
										backgroundColor: "#171920",
										color: "#fff",
										float: "right"
									}}
								>
									上传封面
								</Button>
								{/* 头像 */}
								<Avatar
									style={{
										width: "60px",
										height: "60px",
										display: "block",
										margin: "10px auto",
										marginLeft: "547px"
									}}
									src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								/>
								{/* 用户资料 */}
								<div style={{ textAlign: "center" }}>
									<span style={{ color: "#fff", marginRight: "10px" }}>
										{userInfo.name}
									</span>
									<img
										style={{ marginTop: "-4px" }}
										src={require("../../statics/images/个人中心/jiantou.png")}
										className="user_counselor"
										alt=""
									/>
									<br></br>
									<span style={{ color: "#fff", marginRight: "8px" }}>
										深圳
									</span>
									<span style={{ color: "#fff", marginLeft: "4px" }}>|</span>
									<span style={{ color: "#fff", marginLeft: "8px" }}>
										实习律师
									</span>
								</div>
								{/* 信息简介 */}
								<div className="resume">
									<p>
										简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简
										介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
									</p>
								</div>
							</div>
							{/* 内容切换部分 */}
							<div
								style={{
									width: "1200px",
									borderRadius: "8px",
									boxSizing: "content-box"
								}}
							>
								<Tabs
									tabBarGutter={465}
									style={{
										margin: "-42px 0px",
										backgroundColor: "#fff",
										width: "1200px"
									}}
								>
									<TabPane tab="律师信息" key="1">
										{/* 个人信息 */}
										<div
											style={{
												marginTop: "10px",
												padding: "0px 30px 0px 30px"
											}}
										>
											<div>
												{/* 头部个人 */}
												<div className="userxixi">
													<span className="lanse"></span>
													<h2
														style={{
															position: "absolute",
															top: "1px",
															left: "10px"
														}}
													>
														个人信息
													</h2>
													<span
														style={{
															color: "#007acc",
															float: "right",
															marginRight: "30px"
														}}
													>
														编辑
													</span>
													<img
														style={{
															float: "right",
															margin: "6px 10px 0px 0px"
														}}
														src={require("../../statics/images/个人中心/bj.png")}
														alt=""
													/>
												</div>
												{/* 详细个人 */}
												<div>
													<div style={{ marginTop: "15px" }}>
														<span
															style={{
																marginLeft: "28px",
																fontSize: "16px",
																color: "#333",
																marginTop: "15px"
															}}
														>
															姓名：
														</span>
														<span
															style={{
																marginLeft: "17px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															庄国超
														</span>
														<br></br>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															出生年月：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															1991年8月
														</span>
														<br></br>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															毕业院校：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															深圳大学
														</span>
													</div>
												</div>
											</div>
											{/* 律师信息 */}
											<div style={{ marginTop: "25px" }}>
												{/* 律师信息 */}
												<div className="userxixi">
													<span className="lanse"></span>
													<h2
														style={{
															position: "absolute",
															top: "1px",
															left: "10px"
														}}
													>
														律师信息
													</h2>
													<span
														style={{
															color: "#007acc",
															float: "right",
															marginRight: "30px"
														}}
													>
														编辑
													</span>
													<img
														style={{
															float: "right",
															margin: "6px 10px 0px 0px"
														}}
														src={require("../../statics/images/个人中心/bj.png")}
														alt=""
													/>
												</div>
												{/* 详细个人 */}
												<div>
													<div style={{ marginTop: "15px" }}>
														<span
															style={{
																fontSize: "16px",
																color: "#333",
																marginTop: "15px"
															}}
														>
															执业律所：
														</span>
														<span
															style={{
																marginLeft: "17px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															广东法仁律师事务所
														</span>
														<br></br>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															执业地区：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															广东省深圳市福田区石厦新天世纪商务中心B座1513
														</span>
														<br></br>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															执业证号：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															65461346784654
														</span>
													</div>
												</div>
											</div>
											{/* 联系方式 */}
											<div style={{ marginTop: "25px", marginBottom: "20px" }}>
												{/* 联系方式 */}
												<div className="userxixi">
													<span className="lanse"></span>
													<h2
														style={{
															position: "absolute",
															top: "1px",
															left: "10px"
														}}
													>
														联系方式
													</h2>
													<span
														style={{
															color: "#007acc",
															float: "right",
															marginRight: "30px"
														}}
													>
														编辑
													</span>
													<img
														style={{
															float: "right",
															margin: "6px 10px 0px 0px"
														}}
														src={require("../../statics/images/个人中心/bj.png")}
														alt=""
													/>
												</div>
												{/* 详细个人 */}
												<div>
													<div style={{ marginTop: "15px" }}>
														<span
															style={{
																fontSize: "16px",
																color: "#333",
																marginTop: "15px"
															}}
														>
															手机：
														</span>
														<span
															style={{
																marginLeft: "17px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															1352685285
														</span>
														<br></br>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															邮箱：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															383058387@qq.com
														</span>
														<br></br>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															微信：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															541645814
														</span>
													</div>
													<div style={{ marginTop: "15px" }}>
														<span style={{ fontSize: "16px", color: "#333" }}>
															座机：
														</span>
														<span
															style={{
																marginLeft: "10px",
																fontSize: "16px",
																color: "#333"
															}}
														>
															0755-58625298
														</span>
													</div>
												</div>
											</div>
										</div>
									</TabPane>
									{/* 律师案例 */}
									<TabPane tab="律师案例" key="2">
										<div className="difficult">
											<div className="hierarchy">
												<span
													style={{
														fontSize: "14px",
														color: "#333",
														marginLeft: "18px"
													}}
												>
													法院层级
												</span>
												<img
													style={{
														position: "absolute",
														left: "76px",
														top: "10px"
													}}
													src={require("../../statics/images/个人中心/xszh.png")}
													alt=""
												/>
												<span
													style={{
														fontSize: "14px",
														color: "#333",
														marginLeft: "55px"
													}}
												>
													裁判日期
												</span>
												<img
													style={{
														position: "absolute",
														left: "189px",
														top: "11px"
													}}
													src={require("../../statics/images/个人中心/xszh.png")}
													alt=""
												/>
												<span
													style={{
														fontSize: "14px",
														color: "#333",
														marginLeft: "55px"
													}}
												>
													裁判程序
												</span>
												<img
													style={{
														position: "absolute",
														left: "299px",
														top: "12px"
													}}
													src={require("../../statics/images/个人中心/xszh.png")}
													alt=""
												/>
												<Button
													size="small"
													style={{
														backgroundColor: "#171920",
														color: "#fff",
														float: "right",
														marginRight: "10px"
													}}
													onClick={() =>
														this.props.changePopupBox([{ type: "case_manger" }])
													}
												>
													案件管理
												</Button>
											</div>
											{/* content 内容 */}
											{this.state.data.map(item => (
												<div
													key={item.id}
													style={{
														backgroundColor: "#fff",
														borderRadius: "5px"
													}}
												>
													<div
														style={{ marginTop: "25px", padding: "10px 10px" }}
													>
														<span style={{ fontSize: "16px", color: "#333" }}>
															{" "}
															广东法仁律师事务所与国家工商行政管理总局商标评审委员会二审行政判决书
														</span>
														<Button
															size="small"
															style={{
																backgroundColor: "#171920",
																color: "#fff",
																float: "right",
																marginRight: "10px"
															}}
															className="mingshu"
														>
															民事诉讼
														</Button>
													</div>
													<div
														style={{
															marginTop: "10px",
															marginBottom: "30px",
															paddingBottom: "10px",
															padding: "10px 10px"
														}}
													>
														<Icon
															type="usergroup-delete"
															style={{ color: "#86b0ff" }}
														/>
														<span
															style={{
																fontSize: "14px",
																color: "#333",
																marginLeft: "4px"
															}}
														>
															北京人民法院
														</span>
														<Icon
															type="printer"
															style={{ color: "#86b0ff", marginLeft: "40px" }}
														/>
														<span
															style={{
																fontSize: "14px",
																color: "#333",
																marginLeft: "2px"
															}}
														>
															（2019）最高法民终756号
														</span>
														<Icon
															type="dashboard"
															style={{ color: "#86b0ff", marginLeft: "40px" }}
														/>
														<span
															style={{
																fontSize: "14px",
																color: "#333",
																marginLeft: "2px"
															}}
														>
															2019-03-21
														</span>
													</div>
												</div>
											))}
											<div style={{ clear: "both" }}></div>
											<div
												style={{ marginLeft: "340px", marginBottom: "20px" }}
											>
												<Pagination defaultCurrent={1} total={500} />
											</div>
										</div>
									</TabPane>
									<TabPane tab="问题解答" key="3">
										<div className="difficult">
											{/* 内容 */}
											<div className="difficult_answer">
												{/* 头像 */}
												<div style={{ float: "left" }}>
													<Avatar icon="user" />
												</div>
												{/* 用户名信息 */}
												<div style={{ float: "left", marginLeft: "20px" }}>
													<span style={{ fontSize: "16px", color: "#333" }}>
														用户名
													</span>
													<br></br>
													<span style={{ fontSize: "12px", color: "#B3B3B3" }}>
														2019年7月10日 19:00
													</span>
													<div className="usertxt">
														<p>
															我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东西的途中遇到人家堆碳在
															马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
														</p>
													</div>
												</div>
												<div style={{ clear: "both" }}></div>
												{/* 评论 */}
												<div className="difficult_like">
													<span className="mr10">
														<Icon type="message" />
														&nbsp;&nbsp;2
													</span>
													<span>
														<Icon type="heart" />
														&nbsp;&nbsp;1
													</span>
												</div>
												<div style={{ clear: "both" }}></div>
												<Divider />
												{/* 头像 */}
												<div style={{ float: "left" }}>
													<Avatar icon="user" />
													<br></br>
													<Button
														size="small"
														type="primary"
														ghost
														style={{
															height: "24px",
															fontSize: "12px",
															marginTop: "11px"
														}}
													>
														回复
													</Button>
												</div>
												{/* 用户名信息 */}
												<div style={{ float: "left", marginLeft: "20px" }}>
													<span style={{ fontSize: "16px", color: "#333" }}>
														用户名
													</span>
													<br></br>
													<span style={{ fontSize: "12px", color: "#B3B3B3" }}>
														2019年7月10日 19:00
													</span>
													<div className="usertxt">
														<p>这个问题有点难搞</p>
													</div>
												</div>
												<div style={{ clear: "both" }}></div>
												{/* 评论 */}
												<div className="difficult_like">
													<span>
														<Icon type="heart" />
														&nbsp;&nbsp;6666
													</span>
												</div>
											</div>
											{/* 内容 2*/}
											<div className="difficult_answer">
												{/* 头像 */}
												<div style={{ float: "left" }}>
													<Avatar icon="user" />
												</div>
												{/* 用户名信息 */}
												<div style={{ float: "left", marginLeft: "20px" }}>
													<span style={{ fontSize: "16px", color: "#333" }}>
														用户名
													</span>
													<br></br>
													<span style={{ fontSize: "12px", color: "#B3B3B3" }}>
														2019年7月10日 19:00
													</span>
													<div className="usertxt">
														<p>
															我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东西的途中遇到人家堆碳在
															马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
														</p>
													</div>
												</div>
												<div style={{ clear: "both" }}></div>
												{/* 评论 */}
												<div className="difficult_like">
													<span className="mr10">
														<Icon type="message" />
														&nbsp;&nbsp;2
													</span>
													<span>
														<Icon type="heart" />
														&nbsp;&nbsp;1
													</span>
												</div>
												<div style={{ clear: "both" }}></div>
												<Divider />
												{/* 头像 */}
												<div style={{ float: "left" }}>
													<Avatar icon="user" />
													<br></br>
													<Button
														size="small"
														type="primary"
														ghost
														style={{
															height: "24px",
															fontSize: "12px",
															marginTop: "11px"
														}}
													>
														回复
													</Button>
												</div>
												{/* 用户名信息 */}
												<div style={{ float: "left", marginLeft: "20px" }}>
													<span style={{ fontSize: "16px", color: "#333" }}>
														用户名
													</span>
													<br></br>
													<span style={{ fontSize: "12px", color: "#B3B3B3" }}>
														2019年7月10日 19:00
													</span>
													<div className="usertxt">
														<div>
															<span> 2018深圳廉租房申请条件</span>
															<br></br>
															<span style={{ marginLeft: "10px" }}>
																1. 申请人必须具有深圳市户籍，且年龄大于23周岁;
															</span>{" "}
															<br></br>
															<span style={{ marginLeft: "10px" }}>
																{" "}
																2.
																申请人需有深圳社会保险，且积累缴费满3年以上，在2011年6月1日后补缴的社会保险的时间不可以纳入积累缴费时间。
															</span>
															<br></br>
															<span style={{ marginLeft: "10px" }}>
																3.
																申请人和共同申请人在深圳没有买过政策性的住房，且没有享受过购房补贴政策，在深圳没有拥有任何形式的自有住房，
																且在2010年1月30日之后未在深圳转让过或是因离婚分割过自有住房。
															</span>
															<br></br>
															<span style={{ marginLeft: "10px" }}>
																4.
																申请人和共同申请人提出申请时，在深圳还没有租住所有形式的保障性住房，和在深圳当地领取低保廉租货币补贴、
																低收入或人才租房货币补贴的，可以申请公共租赁住房，但在其签订公共租赁住房租赁合同后，需立即停发租房货币补贴。
															</span>
															<br></br>
															<span style={{ marginLeft: "10px" }}>
																5.
																申请人和共同申请人没有违反国家计划生育政策超生子女的行为。
																申请到廉租房后，还需要知道廉租房根据法律规定是不允许买卖，因为廉租房是有产权，承租人只有居住权力。
																而且廉租房一般是一年一签，到期后有关部门会审核。只要继续符合申请廉租房的经济条件
															</span>
														</div>
													</div>
												</div>
												<div style={{ clear: "both" }}></div>
												{/* 评论 */}
												<div className="difficult_like">
													<span style={{ color: "#333", marginRight: "8px" }}>
														收起
													</span>
													<Icon
														style={{ color: "#007acc", marginRight: "10px" }}
														type="up"
													/>
													<span>
														<Icon type="heart" />
														&nbsp;&nbsp;6666
													</span>
												</div>
											</div>
										</div>
									</TabPane>
								</Tabs>
							</div>
						</div>
					) : null}
				</div>
			</Fragment>
		);
  }
  handlLawyer(){

  }
}

const mapState = state => {
	return {
		userInfo: state.getIn(["header", "userInfo"]) //用户信息
	};
};
const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		}
		// //设置用户信息
		// getUserInfo() {
		// 	dispath(getUserInfo());
		// }
	};
};

export default connect(mapState, mapDispath)(Index);
