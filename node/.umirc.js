
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
    ['mife', {
      type: 'plugin',
      dynamicImport: true,
      externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'dva': 'window.dva',
      },
    }]
  ],
  hash: true,
}
