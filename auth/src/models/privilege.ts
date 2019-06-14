import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/privilege';

export default {
	namespace: `${MODEL}_privilege`,
	state: {
		active: undefined,
		init: false,
		data: [],
	},

	effects: {
		*get(_: AnyAction, { call, put, select }: EffectsCommandMap) {
			const { userType, projects, current } = yield select(({ user: { profile } }: any) => profile);
			let project_id = 0;
			if (userType !== 1) {
				project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
			}
			const { data, err } = yield call(api.getPrivileges, { project_id, admin: userType === 1 });
			if (!!err) {
				message.error(err, 5);
			} else {
				yield put({
					type: 'save',
					payload: {
						init: true,
						data: data || [],
					}
				});
			}
		},
		*update({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
			const { err } = yield call(api.updatePrivileges, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				message.success('权限更新成功', 5);
			}
		},
	},
	reducers: {
		save(state: any, { payload }: any) {
			return { ...state, ...payload }
		},
	},
}