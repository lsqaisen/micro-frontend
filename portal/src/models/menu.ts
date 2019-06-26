
export default {
  namespace: 'menu',
  state: [{
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
  }],

  reducers: {
    update(state: any, { payload }: any) {
      if (Array.isArray(payload)) {
        // let groupIndex = state.findIndex(({ key }: any) => key === payload.group);
        // !state[groupIndex].childs.some(({ key }: any) => payload.key === key) && state[groupIndex].childs.push(payload)
      } else {
        let groupIndex = state.findIndex(({ key }: any) => key === payload.group);
        !state[groupIndex].childs.some(({ key }: any) => payload.key === key) && state[groupIndex].childs.push(payload)
      }
      return state;
    },
  }
}
