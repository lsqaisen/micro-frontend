import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/config';

export default {
	namespace: `${MODEL}_config`,
	state: {
		init: false,
	},

	effects: {
		*get(_: AnyAction, { call, put, select }: EffectsCommandMap) {
			const { data, err } = yield call(api.getConfig);
			if (!!err) {
				message.error(err, 5);
			} else {
				yield put({
					type: 'save',
					payload: {
						init: true,
						...data,
					}
				});
			}
		},
		*setsmtp({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
			const { err } = yield call(api.setSmtp, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				message.success('设置SMTP成功', 5);
				yield put({ type: 'get' })
			}
		},
		*testsmtp({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
			const { err } = yield call(api.testSmtp, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				message.success('测试成功', 5);
			}
		},
		*setSmtpStatus({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
			const { err } = yield call(api.setSmtpStatus, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				yield put({ type: 'get' })
			}
		},
		*setldap({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
			const { err } = yield call(api.setLdap, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				message.success('设置LDAP成功', 5);
				yield put({ type: 'get' })
			}
		},
		*setLdapStatus({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
			const { err } = yield call(api.setLdapStatus, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				yield put({ type: 'get' })
			}
		},
	},
	reducers: {
		save(state: any, { payload }: any) {
			return { ...state, ...payload }
		},
	},
}