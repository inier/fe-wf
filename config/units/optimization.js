// 打包优化
module.exports = (config, resolve) => {
    return () => {
        // Bundle Splitting
        config.optimization.splitChunks({
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 3,
            maxInitialRequests: 3,
            cacheGroups: {
                // 将公共的包提取到 chunk-vendors
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true,
                },
            },
        });
        // Tree Shaking
        // 如何使用tree-shaking？
        // 1.确保代码是es6格式,即 export，import
        // 2.package.json中，设置 sideEffects
        // 3.确保 tree-shaking 的函数没有副作用
        // 4.babelrc中设置presets [["@babel/preset-env", { "modules": false }]] 禁止转换模块，交由webpack进行模块化处理
        // 5.结合uglifyjs-webpack-plugin
        // webpack4 在生产环境已经默认添加，开箱即用
        config.optimization.usedExports(true);
    };
};
