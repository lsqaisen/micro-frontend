
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
        webpackChunkName: false,
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
    }],
  ],
  hash: true,
  copy: [{ from: './src/public/oem', to: './static/oem', toType: 'dir' },],
  chainWebpack(config, { webpack }) {
    config.resolve.extensions.add(".tsx");
  },
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
    "/api": {
      "target": "http://192.168.1.60:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "/api" }
    },
    "/login": {
      "target": "http://192.168.1.60:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/login": "/login" }
    },
    "/logout": {
      "target": "http://192.168.1.60:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/logout": "/logout" }
    },
    "/profile": {
      "target": "http://192.168.1.60:30000/",
      "changeOrigin": true,
      "pathRewrite": { "^/profile": "/profile" }
    },
  },
}
