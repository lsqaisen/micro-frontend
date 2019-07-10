const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.default = (api, options = {}) => {
  const binPath = process.env.NODE_ENV === 'development' ? './static/bin/' : '../bin/';
  api.chainWebpackConfig(config => {
    // plugin
    config
      .plugin('copy-webpack')
      .use(CopyWebpackPlugin, [[
        { from: '../.public/', to: binPath, toType: 'dir' },
      ]]);
    // config.externals(options.externals || {});
  });

  api.addHTMLHeadScript(() => {
    const scripts = (options.scripts || []).map(sub => {
      return { src: `/static/bin/js/${sub}?t=${new Date().getTime()}` };
    });
    return scripts;
  });

  api.addHTMLLink(() => {
    return (options.stylesheets || []).map(sub => {
      return { href: `/static/bin/css/${sub}?t=${new Date().getTime()}`, rel: 'stylesheet' };
    });
  });
  api.addRuntimePlugin(
    join(__dirname, 'app.js'),
  );
}
