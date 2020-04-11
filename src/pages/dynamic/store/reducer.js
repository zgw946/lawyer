import { fromJS } from "immutable";

const defaultState = fromJS({
	session: fromJS({
		id: 0,
		type: 0
	})
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case "index/change_session_type": //改变会话
			return state.set("session", fromJS(action.value));
		default:
			return state;
	}
};
