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
		*nodes({ payload = {} }: AnyAction, { call, put, select }: EffectsCommandMap) {
			const { resource } = payload;
			const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
			const { data, err } = yield call(api.getNodes, { namespace, ...payload });
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
		*modifyStatus({ payload }: AnyAction, { call }: EffectsCommandMap) {
			const { err } = yield call(api.modifyStatus, payload);
			if (!!err) {
				message.error(err, 5)
				return err;
			}
			return err
		},
		*[`delete`]({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
			const { err } = yield call(api.deleteNode, payload);
			if (!!err) {
				message.error(err, 5);
				return err;
			} else {
				message.success('删除节点成功', 5);
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