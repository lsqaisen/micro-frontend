import { cluster, getResource, nodes, nodedetail, getApply } from '@/services/node';

export default {
    namespace: 'node',
    state: {
        cluster: { data: { clusters: [] }, err: null },
        resource: {},
        nodes: {},
        installs: {
            info: { data: [], err: null },
            logs: {},
        },
        nodedetails: {},
        apply: {},
    },
    effects: {
        *cluster({ payload }, { call, select, put }) {
            const data = yield call(cluster);
            yield put({ type: 'save', payload: { cluster: { data: { clusters: [] }, err: null, ...data } } });
        },
        *getResource({ payload }, { call, select, put }) {
            const { cluster, resource } = payload;
            const data = yield call(getResource, payload);
            yield put({
                type: 'updateResource',
                payload: {
                    [`${cluster || 'default'}-${resource || '$all'}`]: { data: data.data || {}, err: data.err || null }
                }
            });
        },
        *nodes({ payload }, { call, select, put }) {
            const { resource } = payload;
            const data = yield call(nodes, { ...payload, type: 'node' });
            yield put({
                type: 'updateNodes',
                payload: {
                    [`${resource || '$all'}`]: { data: data.data || {}, err: data.err || null }
                }
            });
        },
        *installs({ payload }, { call, select, put }) {
            const data = yield call(nodes, { ...payload, type: 'install' });
            yield put({
                type: 'updateInstalls',
                payload: {
                    info: { data: data.data || [], err: data.err || null },
                }
            });
        },
        *nodedetail({ payload }, { call, select, put }) {
            const { name } = payload;
            const data = yield call(nodedetail, payload);
            yield put({
                type: 'updateNodeDetail',
                payload: {
                    [`${name}`]: { data: data.data || {}, err: data.err || null }
                }
            });
        },
        *getApply({ payload }, { call, select, put }) {
            const data = yield call(getApply, payload);
            yield put({
                type: 'save',
                payload: {
                    apply: { data: data.data || [], err: data.err || null },
                }
            });
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        updateResource(state, { payload }) {
            return {
                ...state,
                resource: {
                    ...state.resource,
                    ...payload,
                }
            }
        },
        updateNodes(state, { payload }) {
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    ...payload,
                }
            }
        },
        updateInstalls(state, { payload }) {
            return {
                ...state,
                installs: {
                    ...state.installs,
                    ...payload,
                }
            }
        },
        updateNodeDetail(state, { payload }) {
            return {
                ...state,
                nodedetails: {
                    ...state.nodedetails,
                    ...payload,
                }
            }
        },
    },
}