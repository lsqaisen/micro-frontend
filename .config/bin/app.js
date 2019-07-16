import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services';

export function render(oldRender) {
  window.g_app.model({
    namespace: 'menu',
    state: {
      load: {
        login: false,
        plugin: false,
        dashboard: false,
      },
      plugins: [],
      menus: [{
        key: 0,
        name: '控制台',
        childs: [],
      }, {
        key: 1,
        name: '资源与数据',
        childs: [],
      }, {
        key: 3,
        name: '中间件',
        childs: [],
      }, {
        key: 2,
        name: '配置与运维',
        childs: [],
      }]
    },
    effects: {
      *getPlugins(_, { call, put }) {
        const { data, err } = yield call(api.getPlugins);
        if (!!err) {
          message.error(err, 5);
          return err;
        } else {
          yield put({
            type: 'save',
            payload: {
              plugins: (data || {}).plugins || [],
            }
          });
        }
      },
    },
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload }
      },
      updateLoad(state, { payload }) {
        return {
          ...state,
          load: {
            ...state.load,
            ...payload
          }
        }
      },
      updateMenus(state, { payload }) {
        let menus = state.menus;
        if (Array.isArray(payload)) {
          // let groupIndex = state.findIndex(({ key }: any) => key === payload.group);
          // !state[groupIndex].childs.some(({ key }: any) => payload.key === key) && state[groupIndex].childs.push(payload)
        } else {
          let groupIndex = menus.findIndex(({ key }) => key === payload.group);
          !menus[groupIndex].childs.some(({ key }) => payload.key === key) && menus[groupIndex].childs.push(payload)
        }
        return { ...state, menus };
      },
    }
  }
  );
  oldRender();
}