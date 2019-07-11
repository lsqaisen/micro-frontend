import { services } from '@/services/dashboard';

export default {
    namespace: 'servicenumber',
    state: {},
    effects: {
        *query({ payload }, { select, call, put }) {
            let data = yield call(services, { ...payload });
            yield put({ type: 'save', payload: { data: data.data || {}, err: data.err || null } });
            return data;
        },
        *interval({ payload }, { select, call, put }) {
            let data = yield call(services, { ...payload });
            yield put({ type: 'save', payload: { data: data.data || {}, err: data.err || null } });
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
