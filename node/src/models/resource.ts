import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import { getResource, createResource, deleteResource, joinResource, removeResource } from '@/services/resource';

export default {
  namespace: 'resource',
  state: {},

  effects: {
    *get({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { cluster } = payload;
      const { data, err } = yield call(getResource, payload);
      if (!!err) {
        message.error(err, 5)
      } else {
        yield put({
          type: 'save',
          payload: {
            [`${cluster || 'default'}`]: {
              data: data.resources || [],
              init: true,
            }
          }
        });
      }
    },
    *add({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { clusterName, ...request } = payload;
      const { err } = yield call(createResource, request);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加资源池成功', 5);
        yield put({
          type: 'get',
          payload: { cluster: clusterName }
        })
      }
    },
    *[`delete`]({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { clusterName, ...request } = payload;
      const { err } = yield call(deleteResource, request);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除集群成功', 5);
        yield put({
          type: 'get',
          payload: { cluster: clusterName }
        })
      }
    },
    *join({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { clusterName, ...request } = payload;
      const { err } = yield call(joinResource, request);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('加入成功', 5);
      }
    },
    *remove({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { clusterName, ...request } = payload;
      const { err } = yield call(removeResource, request);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('移除成功', 5);
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}