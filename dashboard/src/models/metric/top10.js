import { top10 } from '@/services/dashboard';

export default {
    namespace: 'top10',
    state: {},
    effects: {
        *query({ payload }, { select, call, put }) {
            let data = yield call(top10, { ...payload });
            yield put({ type: 'save', payload: { data: data.data || [], err: data.err || null } });
            return data;
        },
        *interval({ payload }, { select, call, put }) {
            let data = yield call(top10, { ...payload });
            yield put({ type: 'save', payload: { data: data.data || [], err: data.err || null } });
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
