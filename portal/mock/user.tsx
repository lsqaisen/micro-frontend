export default {
  // 支持值为 Object 和 Array
  'GET /api/login': { users: [1, 2] },

  // GET POST 可省略
  '/api/profile': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  // 'POST /api/users/create': (req, res) => { res.end('OK'); },
};