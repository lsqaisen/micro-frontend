
export default {
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      antd: {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true // `style: true` 会加载 less 文件
      },
      routes: {
        exclude: [
          /model/,
        ],
      },
      dynamicImport: {
        webpackChunkName: true
      },
    }],
    ['mife', {
      type: 'plugin',
      dynamicImport: true,
      publicPath: '/lib/',
      externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'dva': 'window.dva',
      },
    }]
  ],
  hash: true,
  chainWebpack(config, { webpack }) {
    config.resolve.extensions.add(".tsx");
  },
  alias: {
    '@': './src/components/'
  },
  proxy: {
    "/service": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/service": "/service" }
    },
    "/ui": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/ui": "/ui" }
    },
    "/login": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/login": "/login" }
    },
    "/logout": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/logout": "/logout" }
    },
    "/profile": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/profile": "/profile" }
    },
    "/api/plugin": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/plugin": "/api/plugin" }
    },
    "/api/license": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/license": "/api/license" }
    },
    "/api/apps": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/apps": "/api/apps" }
    },
    "/api/template": {
      "target": "http://192.168.1.101:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/template": "/api/template" }
    },
  },
}
