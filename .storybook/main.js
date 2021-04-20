const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const resolve = require('../config/webpack/resolve');

// Chatwoot's webpack.config.js
const custom = require('../config/webpack/environment');
process.env.NODE_ENV = 'development';

module.exports = {
  stories: [
    '../app/javascript/**/*.stories.mdx',
    '../app/javascript/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: config => {
    // newConfig.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
    // newConfig.loaders.prepend('vue', vue);
    // newConfig.config.merge({ resolve });
    console.log(custom.plugins.map(i => i.value));

    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        modules: custom.resolvedModules.map(i => i.value),
      },
      module: {
        ...config.module,
        rules: custom.loaders
          .filter(i => i.key !== 'nodeModules')
          .map(i => i.value),
      },
      plugins: [...custom.plugins.map(i => i.value), ...config.plugins],
    };

    return newConfig;
  },
};

// const path = require('path');
// const { environment } = require('@rails/webpacker');
// const genDefaultConfig = require('@storybook/vue/dist/esm/server/');
// const vueLoader = require('../config/webpack/loaders/vue');

// module.exports = (baseConfig, env) => {
//   const config = genDefaultConfig(baseConfig, env);

//   // Extend Storybook Webpack's resolve paths from Webpacker config
//   config.resolve.modules = environment.toWebpackConfig().resolve.modules;

//   // Add Sass and Yaml Loader
//   config.module.rules.push(vueLoader);

//   return config;
// };
