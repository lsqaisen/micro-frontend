import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/user';
import services from '@/services';

export default {
  namespace: `${MODEL}_user`,
  state: {
    active: undefined,
    init: false,
    data: {},
  },

  subscriptions: {
  },

  effects: {
    *get({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const { userType, projects, current } = yield select(({ user: { profile } }: any) => profile);
      let project_id = 0;
      if (userType !== 1) {
        project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
      }
      const { data, err } = yield call(api.getUsers, { project_id, admin: userType === 1, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        const { group_id } = payload;
        yield put({
          type: 'update',
          payload: {
            init: true,
            data: {
              [group_id]: data || {},
            }
          }
        });
      }
    },
    *create({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      const { err } = yield call(api.addUser, { admin: profile.userType === 1, project: namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加用户成功', 5);
      }
    },
    *[`delete`]({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
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
      }
    },
    *edit({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      const { err } = yield call(api.editUser, { admin: profile.userType === 1, project: namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('修改用户成功', 5);
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
    update(state: any, { payload: { data, ...payload } }: any) {
      return {
        ...state,
        ...payload,
        data: {
          ...state.data,
          ...data,
        }
      }
    },
  },
}