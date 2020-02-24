// [EnvironmentPlugin 定义全局变量]
const webpack = require('webpack');

module.exports = ({ config, resolve, options }) => {
    return () => {
        const resolveClientEnv = require('../utils/resolveClientEnv');
        config.plugin('process-env').use(webpack.EnvironmentPlugin, [resolveClientEnv(options)]);
    };
};
