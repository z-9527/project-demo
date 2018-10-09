const {injectBabelPlugin} = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less-modules')

module.exports = function override (config, env) {

  config = injectBabelPlugin(
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    config
  )
  config = injectBabelPlugin(
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
    config,
  )
  config = rewireLess(config, env)
  config = rewireLess.withLoaderOptions({
    modifyVars: {'@layout-header-background': '#2f4050'},
    javascriptEnabled: true,
  })(config, env)
  return config
}