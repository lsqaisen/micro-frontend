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
config.plugins[0][1].routes = {
  exclude: [/model/, /basic/]
};
config.outputPath = "/static  /";
config.plugins.push([
  path.join(__dirname, "../.config/bin/"), {
    type: NODE_ENV === "development" ? "portal" : "plugin",
    publicPath: "/service/portal/lib/",
    ...plugin,
  }
]);
config.define = Object.assign(config.define, {
  "MODEL": "portal",
  "process.env.VERSION": new Date().getTime(),
});
config.externals = Object.assign(config.externals, antdFiles);
config.alias = {
  "api": path.join(__dirname, "../.api/index.ts"),
  "config": path.join(__dirname, "../.config/api/index.ts"),
};
config.theme = path.join(__dirname, "/../.config/config/theme.json");
config.proxy = Object.assign({
  "/service/login/lib/login": {
    "target": "http://localhost:5000",
    "changeOrigin": true,
    "pathRewrite": { "^/service/login/lib/login": "" }
  },
  "/service/dashboard/lib/dashboard": {
    "target": "http://localhost:5002",
    "changeOrigin": true,
    "pathRewrite": { "^/service/dashboard/lib/dashboard": "" }
  },
  "/service/tenant/lib/tenant": {
    "target": "http://localhost:5001",
    "changeOrigin": true,
    "pathRewrite": { "^/service/tenant/lib/tenant": "" }
  },
  "/service/auth/lib/auth": {
    "target": "http://localhost:5003",
    "changeOrigin": true,
    "pathRewrite": { "^/service/auth/lib/auth": "" }
  },
  "/service/plugin/lib/plugin": {
    "target": "http://localhost:5004",
    "changeOrigin": true,
    "pathRewrite": { "^/service/plugin/lib/plugin": "" }
  },
}, apiProxy, modelsProxy);
export default config;