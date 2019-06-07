import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/stack';
import services from '@/services';

export default {
  namespace: 'balance',
  state: {
    details: {},
  },

  subscriptions: {
  },

  effects: {
    *get({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data, err } = yield call(api.getStack, { namespace, ...(payload || {}) });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: ((data || {}).stacks || []).filter((stack: any) => stack.name !== "vm-exposed-ports"),
          }
        });
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}