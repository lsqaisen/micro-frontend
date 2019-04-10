import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import { cluster, resource, nodes, nodedetail, getApply } from '@/services/node.tsx';

export default {
	namespace: 'node',
	state: {
		cluster: [],
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
		*cluster(_: AnyAction, { call, put }: EffectsCommandMap) {
			const { data, err } = yield call(cluster);
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'save',
					payload: {
						cluster: (data || {}).clusters || []
					}
				});
			}
		},
		*resource({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
			const { cluster } = payload;
			const { data, err } = yield call(resource, payload);
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'updateResource',
					payload: {
						[`${cluster || 'default'}`]: data.resources || []
					}
				});
			}
		},
		*nodes({ payload }: AnyAction, { call, select, put }: EffectsCommandMap) {
			const { resource } = payload;
			const { data, err } = yield call(nodes, payload);
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'updateNodes',
					payload: {
						[`${resource || '$all'}`]: {
							data: data.nodes || [],
							total: (data.listMeta || {}).totalItems || (data.nodes || []).length
						}
					}
				});
			}
		},
		*installs({ payload }: AnyAction, { call, select, put }: EffectsCommandMap) {
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