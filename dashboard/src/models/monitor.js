import { nodes, stacks, balances, host, service, balance, rules, groups, events, config } from '@/services/monitor';

export default {
    namespace: 'monitor',
    state: {
        nodes: { data: {}, err: null },
        stacks: { data: {}, err: null },
        balances: { data: {}, err: null },
        host: {
            cpu: { data: {}, err: null },
            mem: { data: {}, err: null },
            systemload: { data: {}, err: null },
            filesystem: { data: {}, err: null },
            diskio: { data: {}, err: null },
        },
        service: {
            cpu: { data: {}, err: null },
            mem: { data: {}, err: null },
            network: { data: {}, err: null },
        },
        balance: {
            minnewconn: { data: {}, err: null },
            mem: { data: {}, err: null },
            network: { data: {}, err: null },
            mintotalrequest: { data: {}, err: null },
            requesterrrate: { data: {}, err: null },
            responseavg: { data: {}, err: null },
        },
        config: { data: [], err: null },
        groups: { data: [], err: null },
        events: { data: { data: [], total: 0 }, err: null },
        smtp: { data: {}, err: null },
    },
    subscriptions: {

    },
    effects: {
        *nodes({ payload }, { select, call, put }) {
            let data = yield call(nodes, payload);
            yield put({ type: 'save', payload: { nodes: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *host({ payload }, { select, call, put }) {
            const { type } = payload;
            let data = yield call(host, payload);
            yield put({ type: 'updateHost', payload: { [`${type}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *stacks({ payload }, { select, call, put }) {
            let data = yield call(stacks, payload);
            yield put({ type: 'save', payload: { stacks: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *service({ payload }, { select, call, put }) {
            const { type } = payload;
            let data = yield call(service, payload);
            yield put({ type: 'updateService', payload: { [`${type}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *balances({ payload }, { select, call, put }) {
            let data = yield call(balances, payload);
            yield put({ type: 'save', payload: { balances: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *balance({ payload }, { select, call, put }) {
            const { type } = payload;
            let data = yield call(balance, payload);
            yield put({ type: 'updateBalance', payload: { [`${type}`]: { data: data.data || {}, err: data.err || null } } });
            return data;
        },
        *rules({ _ }, { select, call, put }) {
            let data = yield call(rules);
            yield put({ type: 'save', payload: { config: { data: data.data || [], err: data.err || null } } });
            return data;
        },
        *groups({ _ }, { select, call, put }) {
            let data = yield call(groups);
            yield put({ type: 'save', payload: { groups: { data: data.data || [], err: data.err || null } } });
            return data;
        },
        *events({ payload }, { select, call, put }) {
            let data = yield call(events, payload);
            yield put({ type: 'save', payload: { events: { data: data.data || { data: [], total: 0 }, err: data.err || null } } });
            return data;
        },
        *smtp({ _ }, { select, call, put }) {
            let data = yield call(config);
            yield put({ type: 'save', payload: { smtp: { data: data.data || {}, err: data.err || null } } });
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
        updateHost(state, { payload }) {
            return {
                ...state,
                host: {
                    ...state.host,
                    ...payload,
                }
            };
        },
        updateService(state, { payload }) {
            return {
                ...state,
                service: {
                    ...state.service,
                    ...payload,
                }
            };
        },
        updateBalance(state, { payload }) {
            return {
                ...state,
                balance: {
                    ...state.balance,
                    ...payload,
                }
            };
        }
    }
}