import assert from 'assert';
import { join, relative } from 'path';
import globby from 'globby';
import webpack from 'webpack';

export default (api, options = {}) => {
  const { dynamicImport = false, publicPath = `/lib/` } = options;
  const { cwd, paths, winPath } = api;
  const isDev = process.env.NODE_ENV === 'development';

  // if (isDev) return;
  assert(api.pkg.name, `package.json must contains a name property`);

  function routesToJSON(routes) {
    return JSON.stringify(routes, (key, value) => {
      switch (key) {
        case 'component':
          const relPath = winPath(relative(paths.absTmpDirPath, join(cwd, value)))
          const webpackChunkName = value.split('/').slice(-1)[0] === "index.js" ? value.split('/').slice(-2, -1)[0] : value.split('/').slice(-1)[0]
          return dynamicImport ? `dynamic({ loader: () => import(/* webpackChunkName: ^${webpackChunkName}^ */'${relPath}')})` : `require('${relPath}').default`;
        case 'path':
          return `/${api.pkg.name}${value}`;
        default:
          return value;
      }
    }, 2);
  }

  function stripJSONQuotes(str) {
    return str
      .replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
        return `"component": ${m2.replace(/\^/g, '"')}`;
      });
  }

  function findModels() {
    const models = [
      ...(globby.sync('**/models/**/*.js', {
        cwd: paths.absSrcPath,
      })),
      ...(globby.sync('**/model.js', {
        cwd: paths.absSrcPath,
      })),
    ];
    return models.map(model => `require('../../${model}').default`);
  }

  function findMenus() {
    return `require('../../menus.js').default`
  }

  function getContent(routesContent, models) {
    return `
import dynamic from 'umi/dynamic';

window.g_umi = window.g_umi || {};
window.g_umi.monorepo = window.g_umi.monorepo || [];
window.g_umi.monorepo.push({
  routes: ${routesContent},
  models: [${models.join(',')}],
  menus: {name: '${api.pkg.name}', data: ${findMenus()}}
});
      `.trim()
  }

  api.onStart(() => {
    process.env.HTML = 'none';
  });

  api.addPageWatcher(['./plugin']);

  api.onGenerateFiles(() => {
    const routes = api.routes[0].routes;
    const routesContent = stripJSONQuotes(routesToJSON(routes));
    const models = findModels();
    const content = getContent(routesContent, models);
    api.writeTmpFile('submodule.js', content);
  });

  api.chainWebpackConfig(config => {
    // entry
    config.entryPoints.clear();
    config.entry(api.pkg.name).add(
      join(api.paths.absTmpDirPath, 'submodule.js'),
    );
    // config.optimization
    api.writeTmpFile('submodulee.js', config);

    // output
    config.output
      .publicPath(`${publicPath}${api.pkg.name}/`)
      .filename(`[name].js`)
      .chunkFilename(`[name].[hash:8].async.js`);
    // module
    config.module
      .rule('css')
      .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 1,
        sourceMap: true,
        modules: true,
        localIdentName: `${api.pkg.name}__[local]___[hash:base64:5]`
      });
    config.module
      .rule('less')
      .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 1,
        sourceMap: true,
        modules: true,
        localIdentName: `${api.pkg.name}__[local]___[hash:base64:5]`
      });
    config.module
      .rule('sass')
      .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 1,
        sourceMap: true,
        modules: true,
        localIdentName: `${api.pkg.name}__[local]___[hash:base64:5]`
      });
    // plugin
    config
      .plugin('name-chunks')
      .use(webpack.NamedChunksPlugin, [(chunk) => {
        if (chunk.name) {
          return `${api.pkg.name}_${chunk.name}`;
        }
        return `${api.pkg.name}_${chunk.modules.map(m => path.relative(m.context, m.request)).join("_")}`;
      }]);
    //externals
    config.externals({
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
      'dva': 'window.dva',
    });
  });
}
