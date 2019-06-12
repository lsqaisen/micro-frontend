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
      console.log( userType, projects, current )
      let project_id = 0;
      if (userType !== 1) {
        project_id = (projects || []).filter((v: any) => v.name == current)[0].id;
      }
      const { data, err } = yield call(api.getUsers, { project_id, admin: userType === 1 });
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
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}