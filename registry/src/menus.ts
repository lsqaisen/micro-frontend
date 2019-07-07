export default {
  key: 'registry',
  name: '镜像管理',
  path: '/registry',
  group: 1,
  admin: true,
  user: true,
  childs: [{
    key: 'projects',
    name: '镜像仓库',
    path: '/projects',
    admin: true,
    user: false,
  }, {
    key: 'repositories',
    name: '镜像列表',
    path: '/repositories',
    admin: true,
    user: true,
  }, {
    key: 'logs',
    name: '操作日志',
    path: '/logs',
    admin: true,
    user: true,
  }]
}