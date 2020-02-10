// css 提取插件 MiniCssExtractPlugin
// https://webpack.docschina.org/plugins/mini-css-extract-plugin/
// https://github.com/webpack-contrib/mini-css-extract-plugin

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, resolve) => {
  return () => {
    config
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin)
  }
}