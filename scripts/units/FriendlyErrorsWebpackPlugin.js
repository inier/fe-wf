// 友好错误提示插件
// https://github.com/geowarin/friendly-errors-webpack-plugin

// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = ({ config }) => {
    const { transformer, formatter } = require('../../lib/resolveLoaderError');
    return () => {
        config.plugin('friendly-errors').use(require('@soda/friendly-errors-webpack-plugin'), [
            {
                additionalTransformers: [transformer],
                additionalFormatters: [formatter],
            },
        ]);
    };
};
