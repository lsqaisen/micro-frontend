import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/quota';

export default {
  namespace: `${MODEL}_quota`,
  state: {
    quotas: {},
    oversets: {},
  },

  effects: {
    *getquota({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(api.getQuota, payload);
      if (!!err) {
        // message.error(err, 5);
      } else {
        const namespace = payload || 'default';
        yield put({
          type: 'update',
          payload: {
            quotas: {
              [namespace]: data || {},
            },
          }
        });
      }
    },
    *setquota({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { err } = yield call(api.setQuota, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('配额设置成功', 5);
        yield put({
          type: 'getquota',
          payload: payload.namespace,
        });
      }
    },
    *resetquota(_: AnyAction, { call, put }: EffectsCommandMap) {
      const { err } = yield call(api.resetQuota);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('重置配额成功', 5);
        yield put({ type: 'getquota' });
      }
    },
    *getoverset({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(api.getOverset, payload);
      if (!!err) {
        message.error(err, 5);
      } else {
        const namespace = payload || 'default';
        yield put({
          type: 'update',
          payload: {
            oversets: {
              [namespace]: (data || {}).over_set || undefined,
            },
          }
        });
      }
    },
    *setoverset({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { err } = yield call(api.setOverset, payload.over_set, payload.namespace);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('设置资源优先级成功', 5);
        yield put({ type: 'getoverset', payload: payload.namespace });
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
    update(state: any, { payload }: any) {
      let _update = { ...state };
      Object.entries(payload).map(([key, value]: any) => {
        _update = Object.assign(_update, { [key]: { ...state[key], ...value } })
      })
      return {
        ...state,
        ..._update,
      }
    },
  },
}