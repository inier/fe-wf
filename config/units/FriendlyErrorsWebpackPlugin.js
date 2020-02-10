// 友好错误提示插件
// https://github.com/geowarin/friendly-errors-webpack-plugin

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config, resolve) => {
    return () => {
        config.plugin('error').use(FriendlyErrorsWebpackPlugin);
    };
};
