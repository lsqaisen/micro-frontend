import { profile, login, license, active, modifyPassword } from '@/services/user';

export default {
    namespace: 'dashboard_user',
    state: {
        profile: { data: undefined, err: null },
        domain: { data: [], err: null },
        license: { data: {}, err: null }
    },

    subscriptions: {
        setup({ dispatch, history }, done) {
            dispatch({ type: 'profile' })
        },
    },

    effects: {
        *profile({ payload }, { call, select, put }) {
            const response = yield call(profile, (payload || {}));
            yield put({
                type: 'save',
                payload: {
                    profile: { data: null, err: null, ...response },
                }
            })
        },
        *login({ payload }, { select, call, put }) {
            const data = yield call(login, payload);
            return data;
        },
        *logout(_, { put }) {
            window.location.href = '/logout'
            yield put({
                type: 'updateState',
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