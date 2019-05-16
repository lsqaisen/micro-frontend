import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/resource';

export default {
  namespace: 'resource',
  state: {},

  effects: {
    *get({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const { cluster } = payload;
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { data, err } = yield call(api.getResource, { namespace, ...payload });
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
    *add({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { clusterName, ...request } = payload;
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { err } = yield call(api.createResource, { namespace, ...request });
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
    *[`delete`]({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { clusterName, ...request } = payload;
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { err } = yield call(api.deleteResource, { namespace, ...request });
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
    *join({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { err } = yield call(api.joinResource, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        message.success('加入成功', 5);
      }
      return err;
    },
    *remove({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { err } = yield call(api.removeResource, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        message.success('移除成功', 5);
      }
      return err;
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}