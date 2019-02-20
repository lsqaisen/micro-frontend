
export default {
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
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
}
