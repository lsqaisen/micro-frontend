
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
    ['../utils/plugin.js', {
      dynamicImport: true,
    }]
  ],
  hash: true,
}
