import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/stack';
import services from '@/services';

export default {
  namespace: 'stack',
  state: {
    active: undefined,
    init: false,
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }: any, done: any) {
      history.listen(({ pathname, search }: any) => {
        if (pathname === '/stack' && !search) {
          dispatch({ type: 'active' })
          dispatch({
            type: 'save',
            payload: {
              init: false
            }
          });
        }
      });
      dispatch({ type: 'active' })
      done();
    },
  },

  effects: {
    *active(_: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(services.getPluginStatus, 'stack');
      if (!!err) {
        message.error(err, 5)
      } else {
        yield put({
          type: 'save',
          payload: {
            active: !!data,
          }
        });
      }
    },
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
    *create({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      console.log(yield select(_ => _.user))
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
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
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