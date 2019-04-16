import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import { getCluster, addCluster, deleteCluster } from '@/services/cluster';

export default {
  namespace: 'cluster',
  state: {
    init: false,
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }: any, done: any) {
      history.listen(({ pathname, search }: any) => {
        if (pathname === '/node' && !search) {
          dispatch({
            type: 'save',
            payload: {
              init: false
            }
          });
        }
      });
      done();
    },
  },

  effects: {
    *get(_: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(getCluster);
      if (!!err) {
        message.error(err, 5)
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: (data || {}).clusters || [],
          }
        });
      }
    },
    *add({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { err } = yield call(addCluster, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加集群成功', 5);
        yield put({ type: 'get' })
      }
    },
    *[`delete`]({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { err } = yield call(deleteCluster, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除集群成功', 5);
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