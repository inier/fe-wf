// DllReferencePlugin 链接 动态链接库 到入口bundle中
// https://webpack.docschina.org/plugins/dll-plugin/#dllreferenceplugin

const webpack = require('webpack');

module.exports = ({ config, resolve, options }) => {
    return async () => {
        if (options.dll) {
            const dllPath = (options.dllCfg && options.dllCfg.output) || 'dll';
            // 告诉 Webpack 使用动态链接库
            await config.plugin('DllReferencePlugin').use(webpack.DllReferencePlugin, [
                {
                    context: process.cwd(),
                    // 描述动态链接库的文件内容
                    manifest: require(resolve(dllPath, 'manifest.json')),
                },
            ]);
        }
    };
};
