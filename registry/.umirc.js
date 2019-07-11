import path from "path";
import fs from "fs";

const antdFiles = JSON.parse(
  `{${fs
    .readFileSync(__dirname + "/node_modules/antd/es/index.d.ts")
    .toString()
    .split(";")
    .filter(v => !!v && v != "\n" && v != "\n\r")
    .map(v =>
      v.replace(
        /export { default as (.+) } from '\.\/(.+)'/g,
        '"antd/es/$2":"window.antd.$1"'
      ).replace(/ /g, "")
    )
    .join(",")}}`
);
const { NODE_ENV } = process.env;
let config = JSON.parse(fs.readFileSync(__dirname + "/../.config/config/config.json").toString()),
  plugin = JSON.parse(fs.readFileSync(__dirname + "/../.config/config/plugin.json").toString()),
  apiProxy = JSON.parse(fs.readFileSync(__dirname + "/../.config/config/api-proxy.json").toString()),
  modelsProxy = JSON.parse(fs.readFileSync(__dirname + "/../.config/config/models-proxy.json").toString());
config.plugins[0].routes = {
  exclude: [/model/, /basic/]
};
config.plugins.push([
  path.join(__dirname, "../.config/bin/"), {
    type: NODE_ENV === "development" ? "portal" : "plugin",
    publicPath: "/service/registry/lib/",
    ...plugin,
  }
]);
config.define = Object.assign(config.define, {
  "MODEL": "registry",
  "process.env.VERSION": new Date().getTime(),
});
config.externals = Object.assign(config.externals, antdFiles);
config.alias = {
  "api": path.join(__dirname, "../.api/index.ts"),
  "config": path.join(__dirname, "../.config/api/index.js"),
};
config.theme = path.join(__dirname, "/../.config/config/theme.json");
config.proxy = Object.assign({}, apiProxy, modelsProxy);
console.log(config)
export default config;
// const antdFiles = getAntdFiles(path.join(__dirname, "/node_modules/antd/es/index.d.ts"))
// const antdFiles = JSON.parse(`{${fs.readFileSync(__dirname + "/node_modules/antd/es/index.d.ts")
//   .toString()
//   .split(";")
//   .filter(v => !!v && v != "\n" && v != "\n\r")
//   .map(v => v.replace(/export { default as (.+) } from "\.\/(.+)"/g, ""antd/es/$2":"window.antd.$1"").replace(/ /g, ""))
//   .join(",")}}`);


// export default {
//   history: "hash",
//   publicPath: "/static/dist/",
//   outputPath: "/lib/",
//   plugins: [
//     ["umi-plugin-react", {
//       dva: true,
//       antd: {
//         "libraryName": "antd",
//         "libraryDirectory": "dist",
//         "style": true
//       },
//       routes: {
//         exclude: [
//           /model/,
//           /basic/
//         ],
//       },
//       dynamicImport: {
//         webpackChunkName: true,
//         loadingComponent: null,
//       },
//     }],
//     [path.join(__dirname, "../.config/bin/"), {
//       type: NODE_ENV === "development" ? "portal" : "plugin",
//       dynamicImport: true,
//       publicPath: "/service/registry/lib/",
//       scripts: [
//         "react.js",
//         "react-dom.js",
//         "dva.js",
//         "moment/moment.min.js",
//         "antd/antd.min.js",
//         "library/library.min.js",
//       ]
//     }],
//   ],
//   hash: true,
//   alias: {
//     "api": path.join(__dirname, "../.api/index.ts"),
//     "config": path.join(__dirname, "../.config/api/index.js"),
//   },
//   externals: {
//     "react": "window.React",
//     "react-dom": "window.ReactDOM",
//     "dva": "window.dva",
//     "moment": "window.moment",
//     "antd": "window.antd",
//     "library": "window.library",
//     ...antdFiles,
//   },
//   define: {
//     "MODEL": "registry",
//     "process.env.OEM_NAME": "/kubeup",
//     "process.env.VERSION": new Date().getTime(),
//   },
//   theme: path.join(__dirname, "/../.config/theme/index.json"),
//   chainWebpack(config) {
//     config.resolve.extensions
//       .add(".tsx")
//       .prepend(".tsx");
//     config.resolve.extensions
//       .add(".ts")
//       .prepend(".ts");
//   },
//   proxy: {
//     //models
//     "/service/login/lib/login": {
//       "target": "http://localhost:5000",
//       "changeOrigin": true,
//       "pathRewrite": { "^/service/login/lib/login": "" }
//     },
//     // api
//     "/api": {
//       "target": "http://192.168.1.181:30000/",
//       "changeOrigin": true,
//       "pathRewrite": { "^/api": "/api" }
//     },
//     "/login": {
//       "target": "http://192.168.1.181:30000/",
//       "changeOrigin": true,
//       "pathRewrite": { "^/login": "/login" }
//     },
//     "/logout": {
//       "target": "http://192.168.1.181:30000/",
//       "changeOrigin": true,
//       "pathRewrite": { "^/logout": "/logout" }
//     },
//     "/profile": {
//       "target": "http://192.168.1.181:30000/",
//       "changeOrigin": true,
//       "pathRewrite": { "^/profile": "/profile" }
//     },
//     "/service": {
//       "target": "http://192.168.1.181:30000/",
//       "changeOrigin": true,
//       "pathRewrite": { "^/service": "/service" }
//     },
//   },
// }