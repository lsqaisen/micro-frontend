import request, { ResType } from '../request';

/**
 * @typedef {object} getAppsRequest
 * @property {string} namespace - 空间
 * @property {number} page - 页
 * @property {number} itemsPerPage - 每页条
 */
export type getAppsRequest = {
  namespace?: string;
  page?: number;
  itemsPerPage?: number;
}

/**
 * 查询所有的服务列表
 * @param {getAppsRequest} options
 * @param {string} namespace - 空间
 * @param {number} page - 页
 * @param {number} itemsPerPage - 每页条
 * @returns {Promise<ResType>}
 */
export function getApps(options: getAppsRequest): Promise<ResType> {
  const { namespace = "default", page = 1, itemsPerPage = 100 } = options;
  return request(`/service/stack/api/app?namespace=${namespace}&itemsPerPage=${itemsPerPage}&page=${page}`);
}


/**
 * @typedef {object} Scheduler
 * @property {'none' | 'resource' | 'node'} type
 * @property {string} tenant
 * @property {string} resource
 * @property {string} hostname
 */
export type Scheduler = {
  type: 'none' | 'resource' | 'node';
  tenant?: string;
  resource?: string;
  hostname?: string
}
/**
 * @typedef {object} Basic
 * @property {string} namespace
 * @property {string} stack
 * @property {string} name
 * @property {string} desc
 * @property {"none" | "share" | "exclusive"} stateful
 * @property {number} replicas
 * @property {number} cpu
 * @property {number} memory
 * @property {boolean} collectLog
 * @property {Scheduler} scheduler
 */
export type Basic = {
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

/**
 * @typedef {object} Port
 * @property {'TCP' | 'UDP'} protocol
 * @property {number} containerPort
 * @property {number} servicePort
 */
export type Port = {
  protocol: 'TCP' | 'UDP';
  containerPort: number;
  servicePort: number;
}

/**
 * @typedef {object} Mount
 * @property {string} key
 * @property {string} name
 * @property {string} mountPath
 * @property {string} path
 */
export type Mount = {
  key: string;
  name: string;
  mountPath: string;
  path: string;
}

/**
 * @typedef {object} PersistentVolumeClaim
 * @property {string} claimName
 * @property {boolean} readOnly
 * @property {string} mountPath
 */
export type PersistentVolumeClaim = {
  claimName: string;
  readOnly: boolean;
  mountPath: string;
}

/**
 * @typedef {object} VolumeClaimTemplate
 * @property {string} pvcpool
 * @property {boolean} readOnly
 * @property {string} mountPath
 */
export type VolumeClaimTemplate = {
  pvcpool: string;
  readOnly: boolean;
  mountPath: string;
}

/**
 * @typedef {object} Volume
 * @property {PersistentVolumeClaim} persistentVolumeClaim
 * @property {VolumeClaimTemplate} volumeClaimTemplate
 */
export type Volume = {
  persistentVolumeClaim?: PersistentVolumeClaim;
  volumeClaimTemplate?: VolumeClaimTemplate;
}

/**
 * @typedef {object} HealthCheck
 * @property {'NONE' | 'TCP' | 'HTTP' | 'CMD'} protocol
 * @property {object} exec
 * @property {string} exec.command
 * @property {object} httpGet
 * @property {string} httpGet.path
 * @property {number} httpGet.port
 * @property {string} httpGet.host
 * @property {'HTTP'} httpGet.scheme
 * @property {object} tcpSocket
 * @property {string} tcpSocket.port
 * @property {string} tcpSocket.host
 * @property {number} initialDelaySeconds
 * @property {number} timeoutSeconds
 * @property {number} periodSeconds
 * @property {number} successThreshold
 * @property {number} failureThreshold
 */
export type HealthCheck = {
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

/**
 * @typedef {object} Env
 * @property {string} name
 * @property {string} value
 */
export type Env = {
  name: string;
  value: string;
}

/**
 * @typedef {object} HostMount
 * @property {boolean} readOnly
 * @property {string} mountPath
 */
export type HostMount = {
  readOnly: boolean;
  mountPath: string;
}

/**
 * @typedef {object} Container
 * @property {string} name
 * @property {string} image
 * @property {string} command
 * @property {boolean} stdin
 * @property {boolean} tty
 * @property {Env[]} envs
 * @property {string} logDir
 * @property {HealthCheck} healthCheck
 * @property {number} cpuPercent
 * @property {number} memPercent
 * @property {Mount[]} cfgFileMounts
 * @property {Mount[]} secretMounts
 * @property {Volume[]} volumes
 * @property {HostMount[]} hostMounts
 */
export type Container = {
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

/**
 * @typedef {object} Pay
 * @property {"postpaid" | "prepaid"} pay_method
 * @property {boolean} renew
 * @property {number} duration
 */
export type Pay = {
  pay_method: "postpaid" | "prepaid";
  renew: boolean;
  duration: number;
}

/**
 * @typedef {object} createAppRequest
 * @property {object} service
 * @property {Port[]} service.ports
 * @property {Container[]} containers
 */
export interface createAppRequest extends Basic, Pay {
  service: {
    ports: Port[],
  },
  containers: Container[];
}

/**
 * 创建服务
 * @param {createAppRequest} options
 * @returns {Promise<ResType>}
 */
export function createApp(options: createAppRequest): Promise<ResType> {
  const { namespace = "default", ...data } = options;
  return request(`/service/stack/api/app`, {
    method: 'post',
    body: { namespace, ...data },
  });
}


/**
 * 删除服务
 * @typedef {object} deleteAppRequest
 * @property {'app' | 'appext'} type - app | appext 
 * @property {string} namespace - 工作空间 
 * @property {string} name  - 服务名称
 * @property {string} stack  - 应用名称
 */
export type deleteAppRequest = {
  type?: 'app' | 'appext';
  namespace?: string;
  name: string;
  stack: string;
}

/**
 * 删除服务
 * @param {deleteAppRequest} options
 * @param {string} options.type app | appext 
 * @param {string} options.namespace 工作空间 
 * @param {string} options.name 服务名称
 * @param {string} options.stack 应用名称
 */
export function deleteApp(options: deleteAppRequest): Promise<ResType> {
  const { type = 'app', namespace = "default", name, stack } = options;
  return request(`/service/stack/api/${type === 'app' ? 'app/del' : 'appext/delete'}`, {
    method: 'post',
    body: { namespace, name, stack },
  });
}