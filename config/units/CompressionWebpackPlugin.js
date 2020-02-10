const CompressionWebpackPlugin = require('compression-webpack-plugin');
const commonConfig = require('../common');

module.exports = (config, resolve) => {
    return () => {
        if (process.argv.includes('--gzip')) {
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
