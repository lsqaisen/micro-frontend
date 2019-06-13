import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/user';
import services from '@/services';

export default {
  namespace: 'authuser',
  state: {
    active: undefined,
    init: false,
    data: [],
  },

  subscriptions: {
  },

  effects: {
    *get(_: AnyAction, { call, put, select }: EffectsCommandMap) {
      const { userType, projects, current } = yield select(({ user: { profile } }: any) => profile);
      let project_id = 0;
      if (userType !== 1) {
        project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
      }
      const { data, err } = yield call(api.getUsers, { project_id, admin: userType === 1 });
      console.log(data, 232)
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
      const { err } = yield call(api.addUser, { admin: profile.userType === 1, project: namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加用户成功', 5);
        yield put({ type: 'get' })
      }
    },
    *[`delete`]({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { userType, projects, current } = yield select(({ user: { profile } }: any) => profile);
      let project_id = 0;
      if (userType !== 1) {
        project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
      }
      const { err } = yield call(api.deleteUser, { admin: userType === 1, project_id, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除用户成功', 5);
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