import request from '@/utils/request';

/**
 * 查询所有的服务列表
 * @param {string} namespace 空间
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条
 */
interface getAppsRequest {
  namespace: string;
  page?: number;
  itemsPerPage?: number;
}

function getApps({ namespace, page = 1, itemsPerPage = 100 }: getAppsRequest) {
  return request(`/service/stack/api/app?namespace=${namespace}&itemsPerPage=${itemsPerPage}&page=${page}`);
}

/**
 * 创建服务
 */
interface Scheduler {
  type: 'none' | 'resource' | 'node';
  tenant?: string;
  resource?: string;
  hostname?: string
}

interface Port {
  protocol: 'TCP' | 'UDP';
  containerPort: number;
  servicePort: number;
}

interface Mount {
  key: string;
  name: string;
  mountPath: string;
  path: string;
}

interface Volume {
  persistentVolumeClaim: {
    claimName: string;
    readOnly: boolean;
    mountPath: string;
  };
  volumeClaimTemplate: {
    pvcpool: string;
    readOnly: boolean;
    mountPath: string;
  }
}

interface Containers {
  name: string;
  image: string;
  command: string;
  stdin: boolean;
  tty: boolean;
  envs: {
    name: string;
    value: string;
  }[];
  logDir: string;
  healthCheck: any,
  cpuPercent: number,
  memPercent: number,
  cfgFileMounts: Mount[];
  secretMounts: Mount[],
  volumes: Volume[],
  hostMounts: {
    readOnly: boolean;
    mountPath: string;
  }[],
}

interface createAppRequest {
  namespace: string;
  name: string;
  desc: string;
  stateful: "none" | "share" | "exclusive";
  replicas: number;
  cpu: number;
  memory: number;
  collectLog: boolean;
  scheduler: Scheduler;
  pay_method: "postpaid" | "prepaid";
  renew: boolean;
  duration: number;
  service: {
    ports: Port[],
  },
  containers: Containers[];
}

function createApp(data: createAppRequest) {
  return request(`/service/stack/api/app`, {
    method: 'post',
    body: data,
  });
}


export {
  getAppsRequest,
  Scheduler,
  Port,
  Mount,
  Volume,
  Containers,
  createAppRequest,
}

export default {
  getApps,
  createApp,
}
