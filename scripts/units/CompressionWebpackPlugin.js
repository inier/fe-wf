// [开启gzip]
// https://webpack.docschina.org/plugins/compression-webpack-plugin/
// https://github.com/webpack-contrib/compression-webpack-plugin

const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = ({ config, options }) => {
    return () => {
        if (options.gzip) {
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
