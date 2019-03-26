export const menus = [
	{
		key: 'dashboard',
		breadcrumb: '总览',
		path: '/dashboard',
		group: 0,
		plugin: null,
		admin: true,
		user: true,
	}, {
		key: 'plugin',
		breadcrumb: '插件管理',
		path: '/plugin',
		group: 0,
		plugin: null,
		admin: true,
		user: false,
	}, {
		key: 'stack',
		breadcrumb: '应用管理',
		path: '/stack',
		group: 0,
		plugin: 'stack',
		admin: false,
		user: true,
		subMenu: [{
			key: "list",
			breadcrumb: "我的应用",
			path: "/list",
			admin: false,
			user: true,
		}, {
			key: "balance",
			breadcrumb: "负载均衡",
			path: "/balance",
			admin: false,
			user: true,
		}, {
			key: "secret",
			breadcrumb: "证书列表",
			path: "/secret",
			admin: false,
			user: true,
		}, {
			key: "configmap",
			breadcrumb: "配置管理",
			path: "/configmap",
			admin: false,
			user: true,
		}, {
			key: "topology",
			breadcrumb: "拓扑图",
			path: "/topology",
			admin: false,
			user: true,
		}]
	}, {
		key: 'appstore',
		breadcrumb: '应用市场',
		path: '/appstore',
		group: 0,
		plugin: 'appstore',
		admin: true,
		user: true,
	}, {
		key: 'cntrhost',
		breadcrumb: '容器主机',
		path: '/cntrhost',
		group: 0,
		plugin: 'stack',
		admin: false,
		user: true,
	}, {
		key: 'devops',
		breadcrumb: 'DevOps',
		path: '/devops',
		group: 3,
		plugin: 'devops',
		admin: false,
		user: true,
	}, {
		key: 'node',
		breadcrumb: '主机管理',
		path: '/node',
		group: 1,
		plugin: 'node',
		admin: true,
		user: true,
	}, {
		key: 'registry',
		breadcrumb: '镜像管理',
		path: '/registry',
		group: 1,
		plugin: 'registry',
		admin: true,
		user: true,
		subMenu: [{
			key: 'projects',
			name: '镜像仓库',
			breadcrumb: '镜像仓库',
			path: '/projects',
			admin: true,
			user: false,
		}, {
			key: 'repositories',
			breadcrumb: '镜像列表',
			path: '/repositories',
			admin: true,
			user: true,
		}, {
			key: 'logs',
			breadcrumb: '操作日志',
			path: '/logs',
			admin: true,
			user: true,
		}],
	}, {
		key: 'storage',
		name: '存储管理',
		breadcrumb: '存储管理',
		path: '/storage',
		group: 1,
		plugin: 'storage',
		admin: true,
		user: true,
		subMenu: [{
			key: 'storagelist',
			breadcrumb: '存储列表',
			path: '/storagelist',
			admin: true,
			user: true,
		}, {
			key: 'pvctag',
			breadcrumb: 'PVC标签',
			path: '/pvctag',
			admin: false,
			user: true,
		}]
	}, {
		key: 'network',
		breadcrumb: '网络管理',
		path: '/network',
		group: 1,
		plugin: 'network',
		admin: true,
		user: true,
		subMenu: [{
			key: 'ippool',
			breadcrumb: 'IP池列表',
			path: '/ippool',
			admin: true,
			user: false,
		}, {
			key: 'ipsection',
			breadcrumb: 'IP池分段',
			path: '/ipsection',
			admin: true,
			user: false,
		}, {
			key: 'policy',
			breadcrumb: '策略路由',
			path: '/policy',
			admin: true,
			user: false,
		}, {
			key: 'bgpdevice',
			breadcrumb: 'BGP设备',
			path: '/bgpdevice',
			admin: true,
			user: false,
		}, {
			key: 'balancevip',
			breadcrumb: '负载均衡VIP',
			path: '/balancevip',
			admin: true,
			user: false,
		}]
	}, {
		key: 'logging',
		breadcrumb: '系统日志',
		path: '/logging/list',
		group: 2,
		plugin: 'logging',
		admin: true,
		user: true,
	}, {
		key: 'monitor',
		breadcrumb: '监控告警',
		path: '/monitor',
		group: 2,
		plugin: 'monitor',
		admin: true,
		user: true,
		subMenu: [{
			key: 'nodeservice',
			breadcrumb: '主机和服务',
			path: '/nodeservice',
			admin: false,
			user: true,
		}, {
			key: 'nodes',
			breadcrumb: '主机',
			path: '/nodes',
			admin: true,
			user: false,
		}, {
			key: 'balance',
			breadcrumb: '负载均衡',
			path: '/balance',
			admin: false,
			user: true,
		}, {
			key: 'config',
			breadcrumb: '报警设置',
			path: '/config',
			admin: true,
			user: true,
		}, {
			key: 'group',
			breadcrumb: '收件组',
			path: '/group',
			admin: true,
			user: true,
		}, {
			key: 'event',
			breadcrumb: '事件',
			path: '/event',
			admin: true,
			user: true,
		}, {
			key: 'set',
			breadcrumb: '配置',
			path: '/set',
			admin: true,
			user: false,
		}],
	}, {
		key: 'auth',
		breadcrumb: '认证授权',
		path: '/auth',
		group: 2,
		plugin: 'auth',
		admin: true,
		user: true,
		subMenu: [{
			key: "user",
			breadcrumb: "用户管理",
			path: '/user',
			admin: true,
			user: true,
		}, {
			key: "config",
			breadcrumb: "系统设置",
			path: '/config',
			admin: true,
			user: false,
		}, {
			key: "audit",
			breadcrumb: "审计日志",
			path: '/audit',
			admin: true,
			user: true,
		}],
	}, {
		key: 'microservices',
		breadcrumb: '微服务',
		path: '/microservices',
		group: 3,
		plugin: 'paas',
		admin: false,
		user: true,
	}, {
		key: 'mysql',
		breadcrumb: 'MySql',
		path: '/mysql',
		group: 3,
		plugin: 'paas',
		admin: false,
		user: true,
	}, {
		key: 'redis',
		breadcrumb: 'Redis',
		path: '/redis',
		group: 3,
		plugin: 'paas',
		admin: false,
		user: true,
	}, {
		key: 'tidb',
		breadcrumb: 'TiDB',
		path: '/tidb',
		group: 3,
		plugin: 'paas',
		admin: false,
		user: true,
	}, {
		key: 'kong',
		breadcrumb: '微服务网关',
		path: '/kong',
		group: 3,
		plugin: 'paas',
		admin: false,
		user: true,
	}, {
		key: 'bigdata',
		breadcrumb: '大数据',
		path: '/bigdata',
		group: 3,
		plugin: 'paas',
		admin: false,
		user: true,
	}, {
		key: 'tenant',
		breadcrumb: '工作空间',
		path: '/tenant',
		group: 2,
		plugin: 'tenant',
		admin: true,
		user: true,
		subMenu: [{
			key: "list",
			breadcrumb: "空间管理",
			path: "/list",
			admin: true,
			user: false,
		}, {
			key: "config",
			breadcrumb: "默认配额",
			path: "/config",
			admin: true,
			user: false,
		}, {
			key: "charge",
			name: "计费管理",
			breadcrumb: "计费管理",
			path: "/charge",
			admin: true,
			user: true,
		}],
	}];

export const exBreadcrumbs = [{
	breadcrumb: '总览',
	path: '/',
}, {
	breadcrumb: '镜像Tags',
	path: '/registry/repositories/tags',
}, {
	breadcrumb: null,
	path: '/tenant/charge/order',
}, {
	breadcrumb: '消费详情',
	path: '/tenant/charge/consume',
}, {
	breadcrumb: '订单详情',
	path: '/tenant/charge/order/:id',
}]

export const delay = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

export function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return uuid;
};

export function newPromise(dispatch, { type, payload }, onSuccess = () => { }, onError = () => { }) {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await dispatch({ type, payload });
			if (!!response.err) {
				onError(response.err);
				reject(response.err);
			} else {
				onSuccess(response.data);
				resolve(response.data);
			}
		} catch (error) {
			onError(error);
			reject(error);
		}
	})
}

window.Number.prototype.flowCeil = function (fractionDigits = 0) {
	if (Number(this.toFixed(fractionDigits)) === 0) return `0`;
	if (this / 1024 / 1024 / 1024 / 1024 >= 1) {
		return `${Number(this / 1024 / 1024 / 1024 / 1024).toFixed(fractionDigits)}T`;
	} else if (this / 1024 / 1024 / 1024 >= 1) {
		return `${Number(this / 1024 / 1024 / 1024).toFixed(fractionDigits)}G`;
	} else if (this / 1024 / 1024 >= 1) {
		return `${Number(this / 1024 / 1024).toFixed(fractionDigits)}M`;
	} else if (this / 1024 >= 1) {
		return `${Number(this / 1024).toFixed(fractionDigits)}K`;
	}
	return `${Number(this).toFixed(fractionDigits)}B`
}

window.Number.prototype.netCeil = function (fractionDigits = 0) {
	if (Number(this.toFixed(fractionDigits)) === 0) return `0`;
	if (this / 1024 / 1024 / 1024 >= 1) {
		return `${Number(this / 1024 / 1024 / 1024).toFixed(fractionDigits)}GB`;
	} else if (this / 1024 / 1024 >= 1) {
		return `${Number(this / 1024 / 1024).toFixed(fractionDigits)}MB`;
	} else if (this / 1024 >= 1) {
		return `${Number(this / 1024).toFixed(fractionDigits)}KB`;
	}
	return `${Number(this).toFixed(fractionDigits)}B`
}