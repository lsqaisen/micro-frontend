
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
        webpackChunkName: true
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
  theme: {
    "@primary-color": "#2E70FB",
    "@sider-background-color": "#EDF0F5"
  },
  proxy: {
    "/lib/stack": {
      "target": "http://localhost:3002",
      "changeOrigin": true,
      "pathRewrite": { "^/lib/stack": "" }
    },
    "/lib/node": {
      "target": "http://localhost:3001",
      "changeOrigin": true,
      "pathRewrite": { "^/lib/node": "" }
    }
  },
  chainWebpack(config, { webpack }) {
    config.resolve.extensions.add(".tsx");
  }
}
