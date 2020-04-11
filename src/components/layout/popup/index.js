import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { changePopupBox } from "./actionCreators";

//引入组件
import AddCase from "./add_case"; //新增案件
import DynamicFiles from "./dynamicFile"; //聊天咨询框上传文件
import SaveFile from "./savefile"; //聊天咨询框保存文件
import CaseAddSchedule from "./case_add_schedule"; //案件新增日程
import TaskDetail from "./task_detail"; //案件任务详情
import AddTask from "./add_task"; //新增案件任务
import PublicCooperation from "./public_cooperation"; //发布协同
import PublicCircle from "./public_circle"; //发布律圈
import OpenDetail from "./open_detail"; //公开咨询详情
import MoveFile from "./move_file"; //移动或复制文件
import CaseManger from "./case_manger"; //案例管理
import Recharge from "./recharge"; //充值
import Withdrawal from "./withdrawal"; //提现
import HeadImage from "./head_image"; //变换头像
import BindMobile from "./bind_mobile"; //绑定手机
import RelieveMobile from "./relieve_mobile"; //解除绑定
import BindWx from "./bind_wx"; //绑定微信
import Schedule from "./schedule"; //我的日程
import AddSchedule from "./add_schedule"; //新增日程
import Establish from "./establish"; //创建日程
import Location from "./location"; //定位
import Subtask from "./subtask"; //定位
import Mymember from "./mymember"; //添加成员
import Investigations from "./investigations"; //异地查档
import Entrust from "./entrust"; //案件委托
import Rest from "./rest"; //其他事项
import Publish from "./publish"; //发表律文
import Folder from "./folder"; //文件夹
import Linkman from "./linkman"; //联系人
import Appointment from "./appointment"; // 预约案件
import Modification from "./modification"; // 修改预约
import PubliCmake from "./publiCmake"; // 发布预约
import Collect from "./collect"; // 消息记录收藏
import Dialogue from "./dialogue"; // 收藏对话
import History from "./history"; // 历史记录
import Memos from "./memos"; // 添加便签
import CaseJurisdiction from "./case_jurisdiction"; // 案件权限
import Taskinput from "./task_detail/task_input"; // 案件权限
class Index extends PureComponent {
	render() {
		return (
			<Fragment>
				{this.props.showBox.map(item => (
					<div key={item.get("type")}>
						{(() => {
							switch (item.get("type")) {
								case "add_case":
									return <AddCase popupType={item.get("type")} />;
								case "case_add_schedule":
									return <CaseAddSchedule popupType={item.get("type")} />;
								case "task_detail":
									return (
										<TaskDetail
											popupType={item.get("type")}
											lawyerId={item.getIn(["task", "id"])}
										/>
									);

								case "add_task":
									return (
										<AddTask
											popupType={item.get("type")}
											lawyerId={item.getIn(["addTask", "id"])}
										/>
									);
								case "public_cooperation":
									return <PublicCooperation popupType={item.get("type")} />;
								case "public_circle":
									return <PublicCircle popupType={item.get("type")} />;
								case "open_detail":
									return <OpenDetail popupType={item.get("type")} />;
								case "move_file":
									return <MoveFile popupType={item.get("type")} />;
								case "case_manger":
									return <CaseManger popupType={item.get("type")} />;
								case "recharge":
									return <Recharge popupType={item.get("type")} />;
								case "withdrawal":
									return <Withdrawal popupType={item.get("type")} />;
								case "head_image":
									return <HeadImage popupType={item.get("type")} />;
								case "bind_mobile":
									return <BindMobile popupType={item.get("type")} />;
								case "bind_wx":
									return <BindWx popupType={item.get("type")} />;
								case "schedule":
									return <Schedule popupType={item.get("type")} />;
								case "add_schedule":
									return <AddSchedule popupType={item.get("type")} />;
								case "location":
									return <Location popupType={item.get("type")} />;
								case "dynamicFile":
									return <DynamicFiles popupType={item.get("type")} />;
								case "savefile":
									return <SaveFile popupType={item.get("type")} />;
								case "subtask":
									return <Subtask popupType={item.get("type")} />;
								case "mymember":
									return (
										<Mymember
											popupType={item.get("type")}
											caseId={item.get("extra")}
										/>
									);
								case "investigations":
									return <Investigations popupType={item.get("type")} />;
								case "entrust":
									return <Entrust popupType={item.get("type")} />;
								case "rest":
									return <Rest popupType={item.get("type")} />;
								case "publish":
									return <Publish popupType={item.get("type")} />;
								case "establish":
									return <Establish popupType={item.get("type")} />;
								case "relieve_mobile":
									return <RelieveMobile popupType={item.get("type")} />;
								case "folder":
									return <Folder popupType={item.get("type")} />;
								case "linkman":
									return <Linkman popupType={item.get("type")} />;
								case "modification":
									return <Modification popupType={item.get("type")} />;
								case "publiCmake":
									return <PubliCmake popupType={item.get("type")} />;
								case "appointment":
									return <Appointment popupType={item.get("type")} />;
								case "collect":
									return <Collect popupType={item.get("type")} />;
								case "dialogue":
									return <Dialogue popupType={item.get("type")} />;
								case "history":
									return <History popupType={item.get("type")} />;
								case "memos":
									return <Memos popupType={item.get("type")} />;
								case "case_jurisdiction":
									return (
										<CaseJurisdiction
											popupType={item.get("type")}
											caseId={item.get("extra")}
										/>
									);
								default:
									return null;
							}
						})()}
					</div>
				))}
			</Fragment>
		);
	}
}

const mapState = state => {
	return {
		showBox: state.getIn(["popup", "showBox"])
	};
};

const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		}
	};
};

export default connect(mapState, mapDispath)(Index);
