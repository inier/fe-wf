// 打包体积分析
// https://github.com/webpack-contrib/webpack-bundle-analyzer

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { checkCLIOptions } = require('../utils');

module.exports = (config, resolve) => {
    return () => {
        if (checkCLIOptions('--report')) {
            config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static',
                },
            ]);
        }
    };
};
