function getAntdFiles(file) {
  return JSON.parse(`{${file
    .toString()
    .split(';')
    .filter(v => !!v && v != '\n' && v != '\n\r')
    .map(v => v.replace(/export { default as (.+) } from '\.\/(.+)'/g, '"antd/es/$2":"window.antd.$1"').replace(/ /g, ''))
    .join(',')}}`);
}

export default getAntdFiles;