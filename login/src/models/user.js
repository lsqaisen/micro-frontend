import router from 'umi/router';
import { profile, login, license, active, modifyPassword } from '@/services/user';
import { message } from 'antd';

export default {
	namespace: 'user',
	state: {
		profile: { data: undefined, err: null },
		domain: { data: [], err: null },
		license: { data: {}, err: null }
	},

	subscriptions: {
		setup({ dispatch, history }, done) {
			history.listen(({ pathname }) => {
				dispatch({
					type: 'profile',
					payload: {
						pathname
					}
				});
			});
		},
	},

	effects: {
		*profile({ payload }, { call, put }) {
			const response = yield call(profile, (payload || {}));
			const _profile = { data: null, err: null, ...response };
			yield put({
				type: 'save',
				payload: {
					profile: _profile,
				}
			})
			const { pathname } = payload;
			if (!!_profile.data && !_profile.err && (pathname === '/login' || pathname === '/')) {
				router.push('/dashboard');
			} else if (!_profile.data && !!_profile.err && pathname !== '/login') {
				router.push('/login');
			}
		},
		*login({ payload }, { select, call, put }) {
			message.destroy()
			const { err } = yield call(login, payload);
			if (!!err) {
				message.error(err, 0)
			} else {
				yield put({
					type: 'profile',
					payload: {
						pathname: '/login'
					}
				});
			}
		},
		*logout(_, { put }) {
			window.location.href = '/logout'
			yield put({
				type: 'save',
				payload: {
					profile: { data: null, err: null },
				},
			});
		},
		*license({ payload }, { call, select, put }) {
			const data = yield call(license);
			const time = new Date((data.data || { expireTime: 0 }).expireTime);
			const purTime = (time - new Date()) / 86400000;
			const expire = purTime <= 30;
			yield put({ type: 'save', payload: { license: { data: {}, err: null, ...data, expire } } });
			return data;
		},
		*active({ payload }, { call, select, put }) {
			const data = yield call(active, payload);
			return data;
		},
		*modifyPassword({ payload }, { call, select }) {
			const data = yield call(modifyPassword, payload);
			return data;
		},
	},
	reducers: {
		save(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
	},
}