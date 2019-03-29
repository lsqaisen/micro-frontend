
export default {
  history: 'hash',
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
        webpackChunkName: true,
        loadingComponent: null,
      },
    }],
    ['mife', {
      type: 'portal',
      externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'dva': 'window.dva',
      },
    }],
  ],
  hash: true,
  copy: [{ from: './src/public/oem', to: './static/oem', toType: 'dir' },],
  define: {
    "process.env.OEM_NAME": '/kubeup'
  },
  theme: {
    "@primary-color": "#1557fb",
    "@sider-background-color": "#EDF0F5"
  },
  proxy: {
    //plugin
    "/lib/stack": {
      "target": "http://localhost:3002",
      "changeOrigin": true,
      "pathRewrite": { "^/lib/stack": "" }
    },
    "/lib/node": {
      "target": "http://localhost:3001",
      "changeOrigin": true,
      "pathRewrite": { "^/lib/node": "" }
    },
    "/lib/login": {
      "target": "http://localhost:8080",
      "changeOrigin": true,
      "pathRewrite": { "^/lib/login": "" }
    },
    //oem
    // "/static/oem": {
    //   "target": "http://localhost:8080/",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/static/oem": "/static/oem/kubeup" }
    // },
    // api
    "/api": {
      "target": "http://ocalhost:8080/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "/" }
    },
    "/logout": {
      "target": "http://192.168.1.103:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/logout": "/logout" }
    },
  },
  chainWebpack(config, { webpack }) {
    config.resolve.extensions.add(".tsx");
  }
}
