// 配置 babel-loader
// https://webpack.docschina.org/loaders/babel-loader/
// https://github.com/babel/babel-loader

module.exports = ({ config, resolve, options }) => {
    const babelConfig = require(resolve('scripts/config/babel.js'))(options);
    const {
        isVueEnabled,
        isReactEnabled,
        isTypeScriptEnabled,
        isEnvProd,
        isEnvTest,
        map: shouldUseSourceMap,
        libs = [],
        dll: useDll,
    } = options;

    let babelOptions = {
        presets: ['@babel/preset-env'],
        // https://babeljs.io/docs/en/plugins
        plugins: [
            'babel-plugin-macros',
            '@babel/plugin-syntax-dynamic-import',
            //https://babeljs.io/docs/en/babel-plugin-proposal-decorators
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
    };

    return () => {
        let tsVueOptions = {};

        //test测试
        if (isEnvTest) {
            babelOptions.presets = [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ];
        }

        // react
        if (isReactEnabled) {
            // https://www.babeljs.cn/docs/babel-preset-react
            babelOptions.presets.push('@babel/preset-react');
        }

        // vue
        if (options.name && options.name.includes('vue') && isVueEnabled) {
            babelOptions.presets.push('@vue/babel-preset-jsx');

            createJSRule('vue', /\.vue$/, 'vue-loader');

            config.plugin('vue').use(require('vue-loader/lib/plugin'));

            tsVueOptions = {
                appendTsSuffixTo: [/\.vue$/],
                reportFiles: ['src/**/*.{ts,tsx}'],
            };
        }

        // ts
        // https://www.babeljs.cn/docs/babel-preset-typescript
        if (isTypeScriptEnabled) {
            const tsOptions = {
                presets: [
                    ...babelOptions.presets,
                    [
                        '@babel/preset-typescript',
                        {
                            isTSX: true,
                            allExtensions: true,
                        },
                    ],
                ],
            };

            createJSRule('bts', /\.tsx?$/, 'babel-loader', tsOptions);

            if (isVueEnabled) {
                Object.keys(tsVueOptions).length && createJSRule('vts', /\.tsx?$/, 'ts-loader', tsVueOptions);
            }
            if (isReactEnabled) {
                createJSRule('tsx', /\.tsx?$/, 'awesome-typescript-loader', {
                    reportFiles: ['src/**/*.{ts,tsx}'],
                });
            }
            if (!isVueEnabled && !isReactEnabled) {
                createJSRule('ts', /\.ts$/, 'ts-loader');
            }
        }

        if (!isVueEnabled && isReactEnabled && isTypeScriptEnabled) {
            createJSRule('sjs', /\.js$/, 'source-map-loader', {}, [], 'pre');
        }

        createJSRule('js', /\.jsx?$/, 'babel-loader', babelOptions); // babelConfig

        // split libs
        if (libs && libs.length && !useDll) {
            // Bundle Splitting
            // https://webpack.docschina.org/configuration/optimization/#optimization-splitchunks
            config.optimization.splitChunks({
                chunks: 'async', // 'all'
                minSize: 30000, // 大于30KB
                minChunks: 1,
                maxAsyncRequests: 3,
                maxInitialRequests: 3,
                cacheGroups: {
                    // 将公共的包提取到 chunk-vendors
                    lib: {
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
        }

        if (isEnvProd) {
            // Tree Shaking
            // 如何使用tree-shaking？
            // 1.确保代码是es6格式,即 export，import
            // 2.package.json中，设置 sideEffects
            // 3.确保 tree-shaking 的函数没有副作用
            // 4.babelrc中设置presets [["@babel/preset-env", { "modules": false }]] 禁止转换模块，交由webpack进行模块化处理
            // 5.结合uglifyjs-webpack-plugin
            // webpack4 在生产环境已经默认添加，开箱即用
            // https://webpack.docschina.org/configuration/optimization/#optimization-usedexports
            // config.optimization.usedExports(true);

            // 分离 runtimeChunk
            // https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk
            config.optimization.runtimeChunk({
                name: 'runtime', // runtime.[hash].js
            });

            const isEnvProdProfile = isEnvProd && process.argv.includes('--profile');

            // minify-uglify-js
            // https://github.com/webpack-contrib/terser-webpack-plugin
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
        }
    };

    // js/jsx & tsx & vue Rule
    function createJSRule(lang, test, loader, options = {}, exclude = [], enforce) {
        const baseRule = config.module.rule(lang).test(test);

        baseRule.include
            .add(resolve('src'))
            .add(resolve('test'))
            .end()
            .exclude.add(/node_modules/)
            .end()
            .use(loader)
            .loader(loader)
            .options(options);

        if (enforce) {
            baseRule.enforce(enforce);
        }
    }
};
