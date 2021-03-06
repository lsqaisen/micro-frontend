import request from '@/utils/request';

/**
 * 查询所有的服务列表
 * @param {string} namespace 空间
 * @param {number} page 页
 * @param {number} itemsPerPage 每页条
 */
interface getAppsRequest {
  namespace?: string;
  page?: number;
  itemsPerPage?: number;
}

function getApps({ namespace = "default", page = 1, itemsPerPage = 100 }: getAppsRequest) {
  return request(`/service/stack/api/app?namespace=${namespace}&itemsPerPage=${itemsPerPage}&page=${page}`);
}

/**
 * 创建服务
 */
interface Basic {
  namespace: string;
  stack: string;
  name: string;
  desc: string;
  stateful: "none" | "share" | "exclusive";
  replicas: number;
  cpu: number;
  memory: number;
  collectLog: boolean;
  scheduler: Scheduler;
}

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

interface HealthCheck {
  protocol: 'NONE' | 'TCP' | 'HTTP' | 'CMD';
  exec?: {
    command: string;
  };
  httpGet?: {
    path: string,
    port: number,
    host: string,
    scheme: 'HTTP',
  };
  tcpSocket?: {
    port: string;
    host?: string;
  };
  initialDelaySeconds: number;
  timeoutSeconds: number;
  periodSeconds: number;
  successThreshold: number;
  failureThreshold: number;
}

interface Env {
  name: string;
  value: string;
}

interface HostMount {
  readOnly: boolean;
  mountPath: string;
}

interface Container {
  name: string;
  image: string;
  command: string;
  stdin: boolean;
  tty: boolean;
  envs?: Env[];
  logDir?: string;
  healthCheck?: HealthCheck,
  cpuPercent: number,
  memPercent: number,
  cfgFileMounts?: Mount[];
  secretMounts?: Mount[],
  volumes?: Volume[],
  hostMounts?: HostMount[],
}

interface Pay {
  pay_method: "postpaid" | "prepaid";
  renew: boolean;
  duration: number;
}

interface createAppRequest extends Basic, Pay {
  service: {
    ports: Port[],
  },
  containers: Container[];
}

function createApp({ namespace = "default", ...data }: createAppRequest) {
  return request(`/service/stack/api/app`, {
    method: 'post',
    body: { namespace, ...data },
  });
}


/**
 * 删除服务
 * @param {string} type app | appext 
 * @param {string} namespace 工作空间 
 * @param {string} name 服务名称
 * @param {string} stack 应用名称
 */

interface deleteAppRequest {
  type?: 'app' | 'appext';
  namespace?: string;
  name: string;
  stack: string;
}

function deleteApp({ type = 'app', namespace = "default", name, stack }: deleteAppRequest) {
  return request(`/service/stack/api/${type === 'app' ? 'app/del' : 'appext/delete'}`, {
    method: 'post',
    body: { namespace, name, stack },
  });
}

export {
  getAppsRequest,
  Basic,
  Scheduler,
  Port,
  Mount,
  Volume,
  HealthCheck,
  Env,
  HostMount,
  Container,
  createAppRequest,
  deleteAppRequest,
}

export default {
  getApps,
  createApp,
  deleteApp,
}
