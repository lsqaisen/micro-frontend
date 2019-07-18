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
}