import { totalResource, resource } from '@/services/dashboard';

export default {
    namespace: 'metric_resource',
    state: {},
    effects: {
        *total({ payload }, { select, call, put }) {
            let data = yield call(totalResource, payload);
            yield put({ type: 'save', payload: { total: data.data || {} } });
            return data;
        },
        *query({ payload }, { select, call, put }) {
            let data = yield call(resource, payload);
            yield put({ type: 'save', payload: { data: data.data || {}, err: data.err || null } });
            return data;
        },
        *interval({ payload }, { select, call, put }) {
            let data = yield call(totalResource, payload);
            yield put({ type: 'save', payload: { total: data.data || {} } });
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