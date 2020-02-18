// [编译进度图形展示]

const chalk = require('chalk');
const webpack = require('webpack');
// https://github.com/hyunchulkwak/webpack-simple-progress-plugin
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
// https://github.com/alexkuz/nyan-progress-webpack-plugin
// https://github.com/s00d/webpack-progress-ora-plugin
// https://www.npmjs.com/package/better-webpack-progress
// https://github.com/clessg/progress-bar-webpack-plugin

module.exports = ({ config, options }) => {
    const { cmd, isEnvProd } = options;
    const progressPlugin = {
        plugin: SimpleProgressPlugin,
        option: {},
    };

    return async () => {
        if (cmd === 'prod' && isEnvProd) {
            // await config.plugin('ProgressPlugin').use(webpack.ProgressPlugin, [
            //     (percentage, message, ...args) => {
            //         // e.g. Output each progress message directly to the console:
            //         console.log(chalk.white.bgGreen(Math.floor(percentage * 100) + '%', message, ...args));
            //     },
            // ]);
            await config.plugin('ProgressPlugin').use(progressPlugin.plugin, [progressPlugin.option]);
        }
    };
};
