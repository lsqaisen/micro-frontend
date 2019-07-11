import { totalResource, registry, realtimeload, summary, nodes, vip, servicestatistics } from '@/services/dashboard';

export default {
    namespace: 'metrics',
    state: {
        resource: {
            total: {}
        },
        registry: {
            data: {},
            err: null,
        },
        vip: { data: {}, err: null },
        nodes: {
            master: { data: {}, err: null },
            balance: { data: {}, err: null },
            monitor: { data: {}, err: null },
            log: { data: {}, err: null },
        },
        servicestatistics: { data: [], err: null },
        realtimeload: {},
        summary: {
            scheduling: { data: {}, err: null },
            balance: { data: {}, err: null },
            monitor: { data: {}, err: null },
            log: { data: {}, err: null },
        }
    },
    effects: {
        *[`resource/total`]({ payload }, { select, call, put }) {
            let data = yield call(totalResource, payload);
            console.log(`${Object.values(payload).join('-')}`)
            yield put({
                type: 'resourceSave',
                payload: {
                    keys: 'total',
                    [`${Object.values(payload).join('-')}`]: data,
                }
            });
            return data;
        },
        // *query({ payload }, { select, call, put }) {
        //     let data = yield call(resource, payload);
        //     yield put({ type: 'save', payload: { data: data.data || {}, err: data.err || null } });
        //     return data;
        // },
        *interval({ payload }, { select, call, put }) {
            let data = yield call(totalResource, payload);
            yield put({ type: 'save', payload: { total: data.data || {} } });
            return data;
        },
        *registry({ payload }, { select, call, put }) {
            let data = yield call(registry, { ...payload });
            yield put({ type: 'save', payload: { registry: { data: data.data || {}, err: data.err || null } } });
            return data;
        },

        *servicestatistics({ payload }, { select, call, put }) {
            let data = yield call(servicestatistics);
            yield put({ type: 'save', payload: { servicestatistics: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *vip({ payload }, { select, call, put }) {
            let data = yield call(vip);
            yield put({ type: 'save', payload: { vip: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *nodes({ payload }, { select, call, put }) {
            const { resource } = payload;
            let data = yield call(nodes, payload);
            yield put({ type: 'updateNodes', payload: { [`${resource}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *realtimeload({ payload }, { select, call, put }) {
            const { resource } = payload;
            let data = yield call(realtimeload, payload);
            yield put({ type: 'updateRealtimeload', payload: { [`${resource}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *summary({ payload }, { select, call, put }) {
            const { resource } = payload;
            let data = yield call(summary, payload);
            yield put({ type: 'updateRummary', payload: { [`${resource}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        }
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
        updateRealtimeload(state, { payload }) {
            return {
                ...state,
                realtimeload: {
                    ...state.realtimeload,
                    ...payload,
                }
            };
        },
        updateRummary(state, { payload }) {
            return {
                ...state,
                summary: {
                    ...state.summary,
                    ...payload,
                }
            };
        },
        resourceSave(state, { payload }) {
            const { keys, ...data } = payload;
            let resource = state.resource;
            console.log(33, resource, data)
            resource[`${keys}`] = Object.assign(resource[`${keys}`], data);
            console.log(1111, resource)
            return {
                ...state,
                resource,
            };
        },
    }
}