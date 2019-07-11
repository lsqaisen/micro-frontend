import { nodes } from '@/services/node';
import services from '@/services/';
export default {
    namespace: 'dashboard',
    state: {
        nodes: {
            $all: { data: {}, err: null },
            master: { data: {}, err: null },
            balance: { data: {}, err: null },
            monitor: { data: {}, err: null },
            log: { data: {}, err: null },
        },
    },
    effects: {
        *active(_, { call, put }) {
            yield put({ type: 'plugin/query' });
            const { data, err } = yield call(services.getPluginStatus, `monitor`);
            if (!!err) {
                message.error(err, 5)
            } else {
                yield put({
                    type: 'save',
                    payload: {
                        active: !!data,
                    }
                });
            }
        },
        *nodes({ payload }, { call, select, put }) {
            const { resource } = payload;
            let data = yield call(nodes, payload);
            yield put({ type: 'updateNodes', payload: { [`${resource || '$all'}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        updateNodes(state, { payload }) {
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    ...payload,
                }
            };
        },
    }
}