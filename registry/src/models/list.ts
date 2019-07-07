import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/repositories';
import user from '@/services/user';
import services from '@/services/index';

export default {
  namespace: `${MODEL}_list`,
  state: {
    active: undefined,
    init: false,
    data: { list: [], total: 0 },
  },

  effects: {
    *get({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const project_id = yield select(({ user: { project_id } }: any) => project_id);
      const { data, err } = yield call(api.getRepositories, { project_id, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: { list: data.repositories, total: data.total },
          }
        });
      }
    },
    *create({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      let project = profile.userType === 1 ? "*" : namespace;
      const { err } = yield call(api.createProject, { project, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('添加工作仓库成功', 5);
      }
    },
    *[`delete`]({ payload }: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(api.deleteProject, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除工作仓库成功', 5);
      }
    },
    *edit({ payload }: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(api.modifyProject, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('修改成功', 5);
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
    *createuser({ payload }: AnyAction, { call, select, put }: EffectsCommandMap) {
      const { namespace, profile } = yield select(({ user: { namespace, profile } }: any) => ({ namespace, profile }));
      const { data, err } = yield call(user.addUser, { admin: profile.userType === 1, project: namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return { data, err };
      } else {
        message.success('添加用户成功', 5);
        yield put({
          type: 'getusers',
          payload: { group_id: "*" }
        });
        return { data, err };
      }
    },
    *setadmin({ payload }: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(api.setAdmin, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('修管理员成功', 5);
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