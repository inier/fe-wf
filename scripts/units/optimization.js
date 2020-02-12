// 打包优化
// https://github.com/neutrinojs/webpack-chain#config-optimization-minimizers-adding
const safePostCssParser = require('postcss-safe-parser');

module.exports = ({ config, options }) => {
    const { isEnvProd, map: shouldUseSourceMap } = options;

    // 优化项进打包时实用
    if (!isEnvProd) {
        return () => {};
    }

    return () => {
        // Bundle Splitting
        // https://webpack.docschina.org/configuration/optimization/#optimization-splitchunks
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
        // https://webpack.docschina.org/configuration/optimization/#optimization-usedexports
        config.optimization.usedExports(true);

        // 压缩js
        // https://github.com/webpack-contrib/terser-webpack-plugin
        const isEnvProdProfile = isEnvProd && process.argv.includes('--profile');
        config.optimization.minimizer('js').use(require.resolve('terser-webpack-plugin'), [
            {
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: shouldUseSourceMap,
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                        drop_console: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    // Added for profiling in devtools
                    keep_classnames: isEnvProdProfile,
                    keep_fnames: isEnvProdProfile,
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
            },
        ]);

        // 压缩css
        // https://github.com/NMFR/optimize-css-assets-webpack-plugin
        config.optimization.minimizer('css').use(require.resolve('optimize-css-assets-webpack-plugin'), [
            {
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap
                        ? {
                              // `inline: false` forces the sourcemap to be output into a
                              // separate file
                              inline: false,
                              // `annotation: true` appends the sourceMappingURL to the end of
                              // the css file, helping the browser find the sourcemap
                              annotation: true,
                          }
                        : false,
                },
                cssProcessorPluginOptions: {
                    preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                },
            },
        ]);
    };
};
