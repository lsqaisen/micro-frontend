import path from 'path';
import fs from 'fs';
import theme from '../_config/theme/';

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
      antd: true,
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
    [path.join(__dirname, '../_config/bin/'), {
      type: NODE_ENV === "development" ? 'portal' : 'plugin',
      dynamicImport: true,
      publicPath: '/service/vm/lib/',
      scripts: [
        'react.js',
        'react-dom.js',
        'dva.js',
        'moment.min.js',
        'antd/antd.min.js',
        'library/library.min.js',
      ],
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
  define: {
    'MODEL': 'vm',
    "process.env.OEM_NAME": '/kubeup',
    "process.env.VERSION": new Date().getTime(),
  },
  theme: theme.default,
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