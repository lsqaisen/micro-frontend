import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/app';
import services from '@/services';

export default {
  namespace: 'app',
  state: {
    init: false,
    data: {
      total: 0,
      data: [],
    },
  },

  effects: {
    *get({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { data, err } = yield call(api.getApps, { namespace, ...(payload || {}) });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: {
              total: (data || {}).listMeta.totalItems || 0,
              data: (data || {}).apps || []
            },
          }
        });
      }
    },
    *create({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { err } = yield call(api.createStack, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加应用栈成功', 5);
        yield put({ type: 'get' })
      }
    },
    *[`delete`]({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { profile: { current } } }: any) => current === 'default' ? undefined : current);
      const { err } = yield call(api.deleteStack, { namespace, name: payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除应用栈成功', 5);
        yield put({ type: 'get' })
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}