// DllReferencePlugin 链接 动态链接库 到入口bundle中
const webpack = require('webpack');

module.exports = (config, resolve) => {
    return () => {
        if (process.argv.includes('--dll')) {
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
