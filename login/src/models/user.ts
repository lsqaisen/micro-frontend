import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import router from 'umi/router';
import debounce from 'lodash.debounce';
import { user } from 'api';
import { message } from 'antd';

export default {
	namespace: 'user',
	state: {
		init: false,
		admin: undefined,
		namespace: undefined,
		workspace_id: undefined,
		project_id: undefined,
		profile: undefined,
		domain: [],
	},

	subscriptions: {
		setup({ dispatch, history }: any, done: any) {
			if (!window.historyListen) {
				window.historyListen = true;
				history.listen(debounce(async ({ pathname }: any) => {
					let { data = undefined, err = undefined } = await dispatch({ type: 'get' });
					if (!!data && !err && (pathname === '/login' || pathname === '/')) {
						router.push('/dashboard');
					} else if ((!data || Object.values(data).every(v => !v)) && pathname !== '/login') {
						router.push('/login');
					}
				}, 5000, { leading: true, trailing: false }));
			}
			done(history.unlisten);
		},
	},

	effects: {
		*login({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
			message.destroy()
			const { data = {}, err } = yield call(user.login, payload!);
			if (!!err || data.code === 203) {
				if (data.code === 203) {
					message.info(data.error, 0)
					return data.code;
				}
				message.error(err, 0)
			} else {
				yield put({ type: 'get' });
				router.push('/dashboard');
			}
		},
		*logout(_: AnyAction, { call }: EffectsCommandMap) {
			yield call(user.logout);
		},
		*get({ payload = {} }: AnyAction, { call, put }: EffectsCommandMap) {
			const { data, err } = yield call(user.getProfile, payload!);
			if (!!err) {
				yield put({
					type: 'save',
					payload: {
						init: true,
						admin: undefined,
						namespace: undefined,
						workspace_id: undefined,
						project_id: undefined,
						profile: undefined,
						domain: [],
					}
				})
			} else {
				yield put({
					type: 'save',
					payload: {
						init: true,
						admin: data.userType === 1,
						profile: data,
						namespace: data.current === 'default' ? 'system' : data.current,
						workspace_id: data.workspace.id,
						project_id: data.userType === 1 ? 0 : (data.projects || []).filter((v: any) => v.name == data.current)[0].id,
					}
				})
			}
			return { data, err };
		},
		*modify({ payload }: AnyAction, { call }: EffectsCommandMap) {
			message.destroy()
			const { err } = yield call(user.modifyPassword, payload!);
			if (!!err) {
				message.error(err, 0)
				return err
			}
		},
		*send({ payload }: AnyAction, { call }: EffectsCommandMap) {
			message.destroy()
			const { err } = yield call(user.sendCode, payload!);
			if (!!err) {
				message.error(err, 0)
				return err
			}
		},
		*getDomain(_: AnyAction, { call, put }: EffectsCommandMap) {
			const { data, err } = yield call(user.getDomain);
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'save',
					payload: {
						domain: Object.keys(data || {}).map(key => (data || {})[key]).filter(v => !!v),
					}
				})
			}
		},
	},
	reducers: {
		save(state: any, { payload }: AnyAction) {
			return {
				...state,
				...payload,
			}
		},
	},
}