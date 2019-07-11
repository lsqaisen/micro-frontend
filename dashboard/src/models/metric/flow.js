import { flow, requests } from '@/services/dashboard';

export default {
    namespace: 'flow',
    state: {},
    effects: {
        *flow({ payload }, { select, call, put }) {
            let data = yield call(flow, { ...payload });
            yield put({ type: 'save', payload: { flow: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *requests({ payload }, { select, call, put }) {
            let data = yield call(requests, { ...payload });
            yield put({ type: 'save', payload: { requests: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        }
    }
}