
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
    }],
    ['../utils/portal', {
      scripts: [
        'http://localhost:3000/stack.js?444',
      ],
      stylesheets: [
        'http://localhost:3000/stack.css?43',
      ],
    }],
  ],
}
