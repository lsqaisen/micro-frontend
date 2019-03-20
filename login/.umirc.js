
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
    }],
  ],
  publicPath: '/mmmm',
  hash: true,
  copy: [{ from: './src/public/oem', to: './static/oem', toType: 'dir' },],
  // urlLoaderExcludes: [/\.(png|jpe?g|gif|svg)(\?.*)?$/],
  chainWebpack(config, { webpack }) {
    config.resolve.extensions.add(".tsx");
    // config.module
    //   .rule('exclude1')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 1,
    //     name: 'static/[name].[ext]'
    //   })
  },
  alias: {
    '@': './src/components/'
  },
  define: {
    "process.env.OEM_NAME": '/kubeup'
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
