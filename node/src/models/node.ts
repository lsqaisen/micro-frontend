import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/node';
import metric, { getMetricsRequest } from '@/services/metric';
import services from '@/services';
import debounce from 'lodash.debounce';


export default {
	namespace: 'node',
	state: {
		metricActive: undefined,
		nodes: {},
		installs: [],
		details: {},
		metrics: {},
	},
	effects: {
		*getMetricActive(_: AnyAction, { call, put }: EffectsCommandMap) {
			const { data, err } = yield call(services.getPluginStatus, 'monitor');
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'save',
					payload: {
						metricActive: !!data,
					}
				});
			}
		},
		*nodes({ payload = {} }: AnyAction, { call, put }: EffectsCommandMap) {
			const { resource } = payload;
			const { data, err } = yield call(api.getNodes, payload);
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
		*installs({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
			const { data, err } = yield call(api.getNodes, payload);
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'save',
					payload: {
						installs: data || [],
					}
				});
			}
		},
		*install({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
			const { err } = yield call(api.install, payload);
			if (!!err) {
				message.error(err, 5)
			}
		},
		*detail({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
			const { data, err } = yield call(api.getNodeDetail, payload);
			if (!!err) {
				message.error(err, 5)
			} else {
				yield put({
					type: 'updateDetails',
					payload: {
						[payload]: {
							init: true,
							node: data || {},
						},
					}
				});
			}
		},
		*metric({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
			const { name, type } = payload as getMetricsRequest;
			if (!name || !type) return;
			const { data, err } = yield call(metric.getMetrics, payload);
			if (!err) {
				yield put({
					type: 'updateMetrics',
					payload: {
						name,
						data: {
							[name]: { [type]: data },
						}
					}
				});
			} else {
				//检测监控插件是否已卸载
				if (err === "没有激活插件[监控]") debounce(function* () {
					yield put({ type: 'getMetricActive' })
				}, 5000, { leading: true, trailing: false });
			}
		},
	},
	reducers: {
		save(state: any, { payload }: AnyAction) {
			return { ...state, ...payload }
		},
		updateNodes(state: any, { payload }: AnyAction) {
			return {
				...state,
				nodes: {
					...state.nodes,
					...payload,
				}
			}
		},
		updateDetails(state: any, { payload }: AnyAction) {
			return {
				...state,
				details: {
					...state.details,
					...payload,
				}
			}
		},
		updateMetrics(state: any, { payload: { name, data } }: AnyAction) {
			return {
				...state,
				metrics: {
					...state.metrics,
					[name]: {
						...state.metrics[name],
						...data[name],
					}
				}
			}
		},
	},
}