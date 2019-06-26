export default {
  user: true,
  admin: true,
  group: 0,
  key: "tenant",
  name: "工作空间",
  path: "/tenant",
  childs: [{
    user: false,
    admin: true,
    key: "list",
    name: "空间管理",
    path: "/list",
  }, {
    user: false,
    admin: true,
    key: "config",
    name: "默认配额",
    path: "/config",
  }, {
    user: true,
    admin: true,
    key: "charge",
    name: "计费管理",
    path: "/charge",
  }]
}