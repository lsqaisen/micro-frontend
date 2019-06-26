export default {
  user: true,
  admin: true,
  group: 2,
  key: "auth",
  name: "认证",
  path: "/auth",
  childs: [{
    user: true,
    admin: true,
    key: "user",
    name: "用户管理",
    path: '/user',
  }, {
    user: false,
    admin: true,
    key: "config",
    name: "系统设置",
    path: '/config',
  }, {
    user: true,
    admin: true,
    key: "audit",
    name: "审计日志",
    path: '/audit',
  }]
}