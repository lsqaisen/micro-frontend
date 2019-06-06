import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { message } from 'antd';
import api from '@/services/apps';
import resource from '@/services/resource';
import node from '@/services/node';
import registry from '@/services/registry';
import secret from '@/services/secret';
import configfile from '@/services/configfile';
import storage from '@/services/storage';
import services from '@/services';

export default {
  namespace: 'apps',
  state: {
    init: false,
    nodes: {},
    resources: [],
    images: {},
    imagetags: [],
    secrets: {},
    configmap: {},
    poollist: [],
    pvclist: [],
    data: {
      total: 0,
      data: [],
    },
  },

  effects: {
    *get({ payload }: AnyAction, { call, put, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data, err } = yield call(api.getApps, { namespace, ...(payload || {}) });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            init: true,
            data: {
              total: (data || {}).listMeta.totalItems || 0,
              data: (data || {}).apps || []
            },
          }
        });
      }
    },
    *create({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { err } = yield call(api.createApp, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.success('创建服务成功', 5);
        yield put({ type: 'get' })
      }
    },
    *[`delete`]({ payload }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { err } = yield call(api.deleteApp, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
        return err;
      } else {
        message.info('正在删除服务，请稍后刷新', 5);
        yield put({ type: 'get' })

      }
    },
    *nodes({ payload = {} }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data, err } = yield call(node.getNodes, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            nodes: {
              data: data.nodes || [],
              total: (data.listMeta || {}).totalItems || (data.nodes || []).length
            }
          }
        });
      }
    },
    *resources({ payload = {} }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data: local, err: local_err } = yield call(resource.getResource, { namespace, ...payload });
      const { data: global, err: global_err } = yield call(resource.getResource, { ...payload });
      let resources: any[] = [];

      if (!!local_err) {
        message.error(local_err, 5);
      } else {
        const local_list = (local.resources || [])
          .filter((resource: any) => resource.type !== 'builtin')
          .map((resource: any) => ({
            key: JSON.stringify({ resource: resource.name, tenant: resource.namespace }),
            label: `${resource.name}`,
          }));
        if (local_list.length > 0) {
          resources = resources.concat([{
            key: `local`,
            label: `本地资源池`,
            children: local_list,
          }])
        }
      }
      if (!!local_err) {
        message.error(local_err, 5);
      } else {
        const global_list = (global.resources || [])
          .filter((resource: any) => (
            resource.type !== 'builtin' &&
            !(local.resources || [])
              .some((_v: any) => _v.name === resource.name && _v.namespace === resource.namespace))
          )
          .map((resource: any) => ({
            key: JSON.stringify({ resource: resource.name, tenant: resource.namespace }),
            label: `${resource.name}`,
          }));
        if (global_list.length > 0) {
          resources = resources.concat([{
            key: `global`,
            label: `公共资源池`,
            children: global_list,
          }])
        }
      }

      yield put({
        type: 'save',
        payload: { resources }
      });
    },
    *images({ payload = {} }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { namespace, workspace_id } = yield select(({ user: { namespace, workspace_id } }: any) => ({ namespace, workspace_id }));
      const { data, err } = yield call(registry.getImages, { namespace, project_id: workspace_id, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            images: {
              data: data.repositories || [],
              total: data.total || (data.repositories || []).length
            }
          }
        });
      }
    },
    *imagetags({ payload = '' }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { data, err } = yield call(registry.getImageTags, payload);
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            imagetags: data || []
          }
        });
      }
    },
    *secrets({ payload = {} }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data, err } = yield call(secret.getSecrets, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            secrets: {
              data: data.secrets || [],
              total: (data.listMeta || {}).totalItems || (data.secrets || []).length
            }
          }
        });
      }
    },
    *configmap({ payload = {} }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data, err } = yield call(configfile.getConfigMap, { namespace, ...payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            configmap: {
              data: data.configFiles || [],
              total: (data.listMeta || {}).totalItems || (data.configFiles || []).length
            }
          }
        });
      }
    },
    *poollist(_: AnyAction, { put, call, select }: EffectsCommandMap) {
      const { data, err } = yield call(storage.getPoolList);
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            poollist: data || [],
          }
        });
      }
    },
    *pvclist({ payload = '' }: AnyAction, { put, call, select }: EffectsCommandMap) {
      const namespace = yield select(({ user: { namespace } }: any) => namespace);
      const { data, err } = yield call(storage.getPvcList, { namespace, name: payload });
      if (!!err) {
        message.error(err, 5);
      } else {
        yield put({
          type: 'save',
          payload: {
            pvclist: (data || {}).items || []
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