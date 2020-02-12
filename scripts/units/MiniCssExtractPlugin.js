// css 提取插件 MiniCssExtractPlugin
// https://webpack.docschina.org/plugins/mini-css-extract-plugin/
// https://github.com/webpack-contrib/mini-css-extract-plugin

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ config, options }) => {
    const { isEnvProd } = options;
    return () => {
        config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
            {
                filename: !isEnvProd ? '[name].css' : 'static/css/[name].[contenthash:8].css',
                chunkFilename: !isEnvProd ? '[id].css' : 'static/css/[id].[contenthash:8].css',
            },
        ]);
    };
};
