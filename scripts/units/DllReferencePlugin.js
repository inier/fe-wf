// [DllReferencePlugin 配置] 链接 动态链接库 到入口bundle中
// https://webpack.docschina.org/plugins/dll-plugin/#dllreferenceplugin

const webpack = require('webpack');

module.exports = ({ config, resolve, options }) => {
    return () => {
        if (options.dll && options.libType) {
            const dllPath = (options.dllCfg && options.dllCfg.output) || 'dll';
            const manifest = `${options.libType}-manifest.json`;
            // 告诉 Webpack 使用动态链接库
            config.plugin('DllReferencePlugin').use(webpack.DllReferencePlugin, [
                {
                    context: process.cwd(),
                    // 描述动态链接库的文件内容
                    manifest: require(resolve(dllPath, manifest)),
                },
            ]);
        }
    };
};
