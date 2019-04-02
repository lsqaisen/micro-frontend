const { NODE_ENV } = process.env;

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
      type: NODE_ENV === "development" ? 'portal' : 'plugin',
      dynamicImport: true,
      publicPath: '/lib/',
      externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'dva': 'window.dva',
      },
    }],
  ],
  hash: true,
  alias: {
    '@': './src/components/'
  },
  define: {
    "process.env.OEM_NAME": '/kubeup'
  },
  theme: {
    "@primary-color": "#1557fb"
  },
  proxy: {
    "/lib/login": {
      "target": "http://localhost:5000",
      "changeOrigin": true,
      "pathRewrite": { "^/lib/login": "" }
    },
    //oem
    "/static/oem": {
      "target": "http://localhost:5000/",
      "changeOrigin": true,
      "pathRewrite": { "^/static/oem": "/static/oem/kubeup" }
    },
    // api
    "/api": {
      "target": "http://192.168.1.60:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "/" }
    },
    "/logout": {
      "target": "http://192.168.1.60:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/logout": "/logout" }
    },
  },
  chainWebpack(config, { webpack }) {
    config.resolve.extensions.add(".tsx");
  },
}
