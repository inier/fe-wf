// DllReferencePlugin 链接 动态链接库 到入口bundle中
// https://webpack.docschina.org/plugins/dll-plugin/#dllreferenceplugin

const webpack = require('webpack');
const { checkCLIOptions } = require('../utils');

module.exports = (config, resolve) => {
    return () => {
        if (checkCLIOptions('--dll')) {
            // 告诉 Webpack 使用动态链接库
            config.plugin('DllReferencePlugin').use(webpack.DllReferencePlugin, [
                {
                    context: process.cwd(),
                    // 描述动态链接库的文件内容
                    manifest: require(resolve('dll/manifest.json')),
                },
            ]);
        }
    };
};
