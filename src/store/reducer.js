import { combineReducers } from "redux-immutable";
import popupReducer from "../components/layout/popup/reducer";
import headerReducer from "../components/layout/header/reducer";
import IndexReduer from "../pages/dynamic/store/reducer";
import ImageCropReducer from '../components/layout/popup/head_image/reducer';
const reducer = combineReducers({
	popup: popupReducer, //弹出框组件
	header: headerReducer, //头部组件
	index: IndexReduer, // 聊天
	imageCrop : ImageCropReducer,//图片裁剪组件
});

export default reducer;
