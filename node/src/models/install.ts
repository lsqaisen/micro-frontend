import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import node from '@/services/node';
import metric, { getMetricsRequest } from '@/services/metric';
import services from '@/services';
import debounce from 'lodash.debounce';


export default {
  namespace: 'install',
  state: {
    installs: [],
  },
  effects: {
    *installs({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { data, err } = yield call(node.getNodes, payload);
      if (!!err) {
        message.error(err, 5)
      } else {
        yield put({
          type: 'save',
          payload: {
            installs: data || [],
          }
        });
      }
    },
    *install({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      const { clusterName, ..._payload } = payload;
      const { err } = yield call(node.install, _payload);
      if (!!err) {
        message.error(err, 5)
      } else {
        yield put({
          type: 'installs',
          payload: {
            cluster: clusterName,
            type: 'install'
          }
        });
      }
    },
    *cancelInstalling(_: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(node.cancelInstalling);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('取消安装成功', 5);
      }
    },
    *cancelPengding({ payload }: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(node.cancelPengding, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('取消安装等待成功', 5);
      }
    },
    *deleteInstallRecord({ payload }: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(node.deleteInstallRecord, payload);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除安装记录成功', 5);
      }
    },
    *deleteInstallAllRecord(_: AnyAction, { call }: EffectsCommandMap) {
      const { err } = yield call(node.deleteInstallAllRecord);
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('删除所有安装记录成功', 5);
      }
    },
  },
  reducers: {
    save(state: any, { payload }: AnyAction) {
      return { ...state, ...payload }
    },
  },
}