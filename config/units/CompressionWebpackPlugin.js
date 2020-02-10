// gzip压缩配置
// https://webpack.docschina.org/plugins/compression-webpack-plugin/
// https://github.com/webpack-contrib/compression-webpack-plugin

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const commonConfig = require('../common');
const { checkCLIOptions } = require('../utils');

module.exports = (config, resolve) => {
    return () => {
        if (checkCLIOptions('--gzip')) {
            config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
                {
                    algorithm: 'gzip',
                    test: /\.js(\?.*)?$/i,
                    // threshold: 10240,
                    minRatio: 0.8,
                },
            ]);
        }
    };
};
