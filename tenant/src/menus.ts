const menus = {
  admin: [{
    key: "list",
    name: "空间列表",
    path: "/list"
  }, {
    key: "default",
    name: "默认配额",
    path: "/default"
  }, {
    key: "charging",
    name: "计费定价",
    path: "/charging"
  }, {
    key: "qrcharge",
    name: "确认充值",
    path: "/qrcharge"
  }, {
    key: "bill",
    name: "账单",
    path: "/bill"
  }, {
    key: "set",
    name: "账户设置",
    path: "/set"
  }],
  user: [{
    key: "bill",
    name: "账单",
    path: "/bill"
  }, {
    key: "qrcharge",
    name: "确认充值",
    path: "/qrcharge"
  }]
}

export default menus;