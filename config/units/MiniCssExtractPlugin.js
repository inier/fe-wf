// css 提取插件 MiniCssExtractPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, resolve) => {
  return () => {
    config
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin)
  }
}