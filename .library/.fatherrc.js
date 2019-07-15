import fs from 'fs';

const antdFiles = JSON.parse(`{${fs.readFileSync(__dirname + '/node_modules/antd/es/index.d.ts')
  .toString()
  .split(';')
  .filter(v => !!v && v != '\n' && v != '\n\r')
  .map(v => v.replace(/export { default as (.+) } from '\.\/(.+)'/g, '"antd/es/$2":"window.antd.$1"').replace(/ /g, ''))
  .join(',')}}`);

export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    globals: {
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
      'dva': 'window.dva',
      'antd': 'window.antd',
      'indexof': 'indexof',
      ...antdFiles,
    },
    name: 'library',
    file: '../../.public/js/library/library',
  },
  cssModules: true,
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
}