import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/tenant';
import user from '@/services/user';
import services from '@/services';

export default {
  namespace: `${MODEL}_tenant`,
  state: {
    active: undefined,
    init: false,
    data: { list: [], total: 0 },
  },

  effects: {
    *active(_: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(services.getPluginStatus, `${MODEL}`);
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
    *get({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(api.getTenants, payload);
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: { list: data.projectList, total: data.total },
          }
        });
      }
    },
    *create({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      let project = profile.userType === 1 ? "*" : namespace;
      const { err } = yield call(api.createTenant, { project, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加工作空间成功', 5);
      }
    },
    *[`delete`]({ payload }: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(api.deleteTenant, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除工作空间成功', 5);
      }
    },
    *edit({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      const { err } = yield call(api.editTenant, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('移除用户成功', 5);
        yield put({ type: 'get' })
      }
    },
    *getusers({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const { userType, projects, current } = yield select(({ user: { profile } }: any) => profile);
      let project_id = 0;
      if (userType !== 1) {
        project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
      }
      const { data, err } = yield call(user.getUsers, { project_id, admin: userType === 1, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            users: data || {},
          }
        });
      }
    },
    *createuser({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      const { data, err } = yield call(user.addUser, { admin: profile.userType === 1, project: namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return { data, err };
      } else {
        message.success('添加用户成功', 5);
        return { data, err };
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}