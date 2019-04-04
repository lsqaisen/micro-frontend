import router from 'umi/router';
import { plugins, active, del } from '@/services/plugin';
import { delay } from '@/utils';
import { message } from 'antd';

export default {
	namespace: 'plugin',
	state: {
		loading: false,
		data: [],
	},
	subscriptions: {
		setup({ dispatch, history }, done) {
			dispatch({ type: 'auto' });
		},
	},
	effects: {
		*plugins(_, { call, put }) {
			yield put({
				type: 'save',
				payload: {
					loading: true,
				}
			})
			const { data, err } = yield call(plugins);
			if (!!err) {
				message.error(err, 5)
				yield put({
					type: 'save',
					payload: {
						loading: false,
					}
				})
			} else {
				yield put({
					type: 'save',
					payload: { loading: false, data: (data || {}).plugins || [] }
				});
			}
		},
		*active({ payload }, { call, put }) {
			const { _, err } = yield call(active, payload);
			if (!!err) {
				message.error(`激活插件失败：${err}`, 5)
			} else {
				yield put({ type: 'plugins' })
			}
		},
		*del({ payload }, { call, put }) {
			const { _, err } = yield call(del, payload);
			if (!!err) {
				message.error(`卸载插件失败：${err}`, 5)
			} else {
				yield put({ type: 'plugins' })
			}
		},
		*auto(_, { select, put }) {
			do {
				yield delay(5000);
				const loading = yield select(_ => _.plugin.loading);
				if (loading) continue;
				const { data: _plugins } = yield select(_ => _.plugin);
				if ((_plugins || []).some(v => v.status !== "active" && v.status !== "inactive")) {
					yield put({ type: 'plugins' });
				}
			} while (true);
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload }
		}
	},
}