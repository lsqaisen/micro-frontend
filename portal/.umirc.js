
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
        webpackChunkName: true,
      },
    }],
    ['../utils/portal', {
      scripts: [
        'http://localhost:3000/stack.js',
        'http://localhost:3001/node.js',
      ],
      stylesheets: [
        'http://localhost:3000/stack.css',
        'http://localhost:3001/node.css',
      ],
    }],
  ],
}
