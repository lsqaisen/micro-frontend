import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/group';
import services from '@/services';

export default {
  namespace: 'group',
  state: {
    active: undefined,
    init: false,
    data: [],
  },

  subscriptions: {
    setup({ dispatch, history }: any, done: any) {
      history.listen(({ pathname, search }: any) => {
        if (['/auth/user', '/auth/config', '/auth/log'].includes(pathname) && !search) {
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
      const { data, err } = yield call(services.getPluginStatus, 'auth');
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
      const { userType, projects, current } = yield select(({ user: { profile } }: any) => profile);
      let project_id = 0;
      if (userType != 1) {
        project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
      }
      const { data, err } = yield call(api.getGroup, project_id);
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: data || [],
          }
        });
      }
    },
    *create({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      let project = profile.userType === 1 ? "*" : namespace;
      const { err } = yield call(api.addGroup, { project, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加用户权限组成功', 5);
        yield put({ type: 'get' })
      }
    },
    *[`delete`]({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { err } = yield call(api.deleteGroup, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除用户权限组成功', 5);
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