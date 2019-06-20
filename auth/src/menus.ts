export const options: any = {
  user: {
    key: "user",
    name: "用户管理",
    path: '/user',
  },
  config: {
    key: "config",
    name: "系统设置",
    path: '/config',
  },
  audit: {
    key: "audit",
    name: "审计日志",
    path: '/audit',
  }
}

export default {
  admin: Object.values(options),
  user: [options.user, options.audit]
}