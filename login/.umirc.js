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
          /basic/
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
  copy: [{ from: './src/public/oem', to: './static/oem', toType: 'dir' },],
  alias: {
    '@': './src/components/'
  },
  define: {
    "process.env.OEM_NAME": '/kubeup',
    "process.env.VERSION": new Date().getTime(),
  },
  theme: {
    "primary-color": "#1557fb"
  },
  chainWebpack(config, { webpack }) {
    config.resolve.extensions
      .add(".tsx")
      .prepend(".tsx");
    config.resolve.extensions
      .add(".ts")
      .prepend(".ts");
  },
  proxy: {
    // api
    "/service": {
      "target": "http://192.168.1.103:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/service": "/service" }
    },
    "/login": {
      "target": "http://192.168.1.103:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/login": "/login" }
    },
    "/logout": {
      "target": "http://192.168.1.103:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/logout": "/logout" }
    },
    "/profile": {
      "target": "http://192.168.1.103:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/profile": "/profile" }
    },
  },
}