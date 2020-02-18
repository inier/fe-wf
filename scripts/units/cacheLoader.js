// [cache-loader 配置（webpack 5 弃用）]
/**
 * https://webpack.docschina.org/loaders/cache-loader/
 * https://github.com/webpack-contrib/cache-loader
 * webpack 5 使用了持久性缓存，与 babel-loader 类似，不再需要此 loader
 */

module.exports = ({ config, resolve }) => {
    const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
    return () => {
        baseRule.exclude
            .add((filePath) => {
                // 不缓存 node_modules 下的文件
                return /node_modules/.test(filePath);
            })
            .end()
            .use('cache-loader')
            .loader('cache-loader')
            .options({
                // 缓存位置
                cacheDirectory: resolve('node_modules/.cache/babel'),
            })
            .end();
    };
};
