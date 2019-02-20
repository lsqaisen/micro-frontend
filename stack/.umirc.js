// import '../../mife/bin/index'

// console.log(require('mife'))
export default {
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
    ['../utils/plugins/plugin.js', {
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
}
