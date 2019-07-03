export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    globals: {
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
      'dva': 'window.dva',
      'antd': 'window.antd',
    },
    name: 'library',
  },
  cssModules: true,
  extractCSS: true,
  // extraBabelPlugins: [
  //   ['babel-plugin-import', {
  //     libraryName: 'antd',
  //     libraryDirectory: 'es',
  //     style: true,
  //   }],
  // ],
}