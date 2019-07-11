import { plugins, active, del } from '@/services/plugin';
import { delay } from '@/utils'

export default {
    namespace: 'plugin',
    state: {
        active: false,
        data: null,
    },
    subscriptions: {
        setup({ dispatch, history }, done) {
            dispatch({ type: 'autoQuery' });
        },
    },
    effects: {
        *query({ payload }, { call, select, put }) {
            const data = yield call(plugins);
            yield put({ type: 'save', payload: { active: true, data: {}, err: null, ...data } });
            return data;
        },
        *_query({ payload }, { call, select, put }) {
            const data = yield call(plugins);
            yield put({ type: 'save', payload: { data: data.data || {}, err: data.err || null } });
            return data;
        },
        *autoQuery({ payload }, { call, select, put }) {
            do {
                yield delay(5000);
                const { data } = yield select(_ => _.plugin);
                const { plugins: _plugins } = data || {};
                if ((_plugins || []).some(v => v.status !== "active" && v.status !== "inactive")) {
                    const data = yield call(plugins);
                    yield put({ type: 'save', payload: { data: data.data || {}, err: data.err || null } });
                }
            } while (true);
        },
        *active({ payload }, { call, select, put }) {
            const data = yield call(active, payload);
            return data;
        },
        *del({ payload }, { call, select, put }) {
            const data = yield call(del, payload);
            console.log(data)
            return data;
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
}