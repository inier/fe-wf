// 编译进度图形展示
// https://github.com/hyunchulkwak/webpack-simple-progress-plugin
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
// const chalk = require('chalk');
// const webpack = require('webpack');

module.exports = ({ config }) => {
    return () => {
        // config.plugin('ProgressPlugin').use(webpack.ProgressPlugin, [
        //     (percentage, message, ...args) => {
        //         // e.g. Output each progress message directly to the console:
        //         console.log(chalk.white.bgGreen(Math.floor(percentage * 100) + '%', message, ...args));
        //     },
        // ]);
        // config.plugin('ProgressPlugin').use(SimpleProgressPlugin);
    };
};
