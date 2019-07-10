import path from 'path';
import fs from 'fs';

const { NODE_ENV } = process.env;
const antdFiles = JSON.parse(`{${fs.readFileSync(__dirname + '/node_modules/antd/es/index.d.ts')
  .toString()
  .split(';')
  .filter(v => !!v && v != '\n' && v != '\n\r')
  .map(v => v.replace(/export { default as (.+) } from '\.\/(.+)'/g, '"antd/es/$2":"window.antd.$1"').replace(/ /g, ''))
  .join(',')}}`);


export default {
  history: 'hash',
  publicPath: '/static/dist/',
  outputPath: '/lib/',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      antd: {
        "libraryName": "antd",
        "libraryDirectory": "dist",
        "style": true
      },
      routes: {
        exclude: [
          /model/,
          /basic/
        ],
      },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: null,
      },
    }],
    [path.join(__dirname, '../.config/bin/'), {
      type: NODE_ENV === "development" ? 'portal' : 'plugin',
      dynamicImport: true,
      publicPath: '/service/tenant/lib/',
      scripts: [
        'react.js',
        'react-dom.js',
        'dva.js',
        'moment.min.js',
        'antd/antd.min.js',
        'library/library.min.js',
      ],
      stylesheets: [
        'antd.min.css',
      ]
    }],
  ],
  hash: true,
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'dva': 'window.dva',
    'moment': 'window.moment',
    'antd': 'window.antd',
    'library': 'window.library',
    ...antdFiles,
  },
  alias: {
    '@': './src/components/'
  },
  define: {
    'MODEL': 'tenant',
    "process.env.OEM_NAME": '/kubeup',
    "process.env.VERSION": new Date().getTime(),
  },
  theme: {
    "primary-color": "#286cff",                               // 全局主色
    "link-color": "#286cff",                                  // 链接色
    "success-color": "#0db46e",                               // 成功色
    "warning-color": "#ff9000",                                // 警告色
    "error-color": "#ff5242",                                 // 错误色
    "font-size-base": "14px",                                 // 主字号
    "heading-color": "rgba(0, 0, 0, .85)",                    // 标题色
    "text-color": "#2f2f2f",                       // 主文本色
    "text-color-secondary": "#888888",                        // 次文本色
    "disabled-color": "rgba(0, 0, 0, .25)",                  // 失效色
    "border-radius-base": "4px",                              // 组件/浮层圆角
    "border-color-base": "#d9d9d9",                           // 边框色
    "box-shadow-base": "0 2px 8px rgba(0, 0, 0, .15)",        // 浮层阴影
    "sider-background-color": "#f2f7fb",                      // 菜单背景颜色
  },
  chainWebpack(config) {
    config.resolve.extensions
      .add(".tsx")
      .prepend(".tsx");
    config.resolve.extensions
      .add(".ts")
      .prepend(".ts");
  },
  proxy: {
    //models
    "/service/login/lib/login": {
      "target": "http://localhost:5000",
      "changeOrigin": true,
      "pathRewrite": { "^/service/login/lib/login": "" }
    },
    // api
    "/api": {
      "target": "http://192.168.1.181:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "/api" }
    },
    "/login": {
      "target": "http://192.168.1.181:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/login": "/login" }
    },
    "/logout": {
      "target": "http://192.168.1.181:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/logout": "/logout" }
    },
    "/profile": {
      "target": "http://192.168.1.181:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/profile": "/profile" }
    },
    "/service": {
      "target": "http://192.168.1.181:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/service": "/service" }
    },
  },
}