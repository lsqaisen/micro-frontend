import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/config';

export default {
  namespace: `${MODEL}_audit`,
  state: {
    init: false,
    data: { list: [], total: 0 },
  },

  effects: {
    *get({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(api.getAudits, payload);
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: { list: data.logs || [], total: data.totalItems || (data.logs || []).length },
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