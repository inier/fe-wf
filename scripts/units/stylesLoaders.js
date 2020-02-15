// 配置样式，style，css、less、sass、postcss 等
// https://webpack.docschina.org/loaders/style-loader/
// https://webpack.docschina.org/loaders/css-loader/
// https://webpack.docschina.org/loaders/sass-loader/
// https://webpack.docschina.org/loaders/less-loader/
// https://webpack.docschina.org/loaders/postcss-loader/
// https://github.com/shama/stylus-loader

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('../utils/getCSSModuleLocalIdent');

module.exports = ({ config, options }) => {
    const { style: styleCfg = {}, isEnvProd, isEnvDev, map, isVueEnabled } = options;
    const { sourceMap, loaderOptions } = styleCfg;
    const shouldUseSourceMap = map || sourceMap;

    function createCSSRule(lang, test, loader, CSSRuleOptions = {}) {
        let baseRegex = test;
        // let moduleRegex = test;
        // let modulesRule = null;

        // if (['sass', 'scss'].includes(lang)) {
        //     baseRegex = new RegExp(`^(?!.*\\.module).*${test.source.slice(0)}`);
        //     moduleRegex = new RegExp(`\\.module${test.source.slice(0)}`);
        //     const moduleRule = config.module.rule(`${lang}-module`).test(moduleRegex);
        //     modulesRule = moduleRule.oneOf('modules').resourceQuery(/module/);
        // }

        const baseRule = config.module.rule(lang).test(baseRegex);
        const normalRule = baseRule.oneOf('normal');

        function applyLoaders(rule, isModules) {
            if (isEnvDev) {
                if (isVueEnabled) {
                    rule.use('vue-style-loader').loader(require.resolve('vue-style-loader'));
                } else {
                    rule.use('style-loader').loader(require.resolve('style-loader'));
                }
            }

            if (isEnvProd && styleCfg.extract) {
                rule.use('extract-css-loader')
                    .loader(MiniCssExtractPlugin.loader)
                    .options({
                        hmr: isEnvDev,
                        publicPath: '/', // 分离后CSS文件的打包位置
                    });
            }

            if (isModules) {
                rule.use('css-loader')
                    .loader(require.resolve('css-loader'))
                    .options({
                        importLoaders: 3,
                        modules: {
                            // 设置css-modules模式下local类名的命名规范
                            // getLocalIdent: getCSSModuleLocalIdent,
                            localIdentName: isEnvDev
                                ? '[path]_[name]_[local]-[hash:base64:5]'
                                : '[name]_[local]-[hash:base64]',
                        },
                        sourceMap: shouldUseSourceMap,
                    });
            } else {
                rule.use('css-loader')
                    .loader(require.resolve('css-loader'))
                    .options({
                        importLoaders: 1,
                        sourceMap: shouldUseSourceMap,
                    });
            }

            rule.use('postcss-loader')
                .loader(require.resolve('postcss-loader'))
                .options(
                    Object.assign(
                        {
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009',
                                    },
                                    stage: 3,
                                }),
                                // Adds PostCSS Normalize as the reset css with default options,
                                postcssNormalize(),
                            ],
                            sourceMap: shouldUseSourceMap,
                        },
                        loaderOptions.postcss
                    )
                );

            if (loader === 'less-loader') {
                const LessPluginFunctions = require('less-plugin-functions');
                const lessFuncOptions = loaderOptions.less.lessFunction
                    ? {
                          plugins: [new LessPluginFunctions()],
                      }
                    : {};

                rule.use(loader)
                    .loader(loader)
                    .options(lessFuncOptions);

                const lessCommonOption = loaderOptions.less.lessCommon;

                if (lessCommonOption) {
                    rule.use('style-resources-loader')
                        .loader('style-resources-loader')
                        .options({ patterns: lessCommonOption });
                }
            } else if (loader) {
                if (isModules) {
                    rule.use('resolve-url-loader')
                        .loader(require.resolve('resolve-url-loader'))
                        .options({
                            sourceMap: shouldUseSourceMap,
                        });
                }

                const rs = require.resolve(loader);

                rule.use(loader)
                    .loader(rs)
                    .options(
                        Object.assign(
                            {
                                sourceMap: shouldUseSourceMap,
                            },
                            CSSRuleOptions
                        )
                    );
            }
        }

        // modulesRule && applyLoaders(modulesRule, true);
        applyLoaders(normalRule, false);
    }

    return () => {
        createCSSRule('css', /\.css$/);
        createCSSRule('postcss', /\.p(ost)?css$/);
        createCSSRule('less', /\.less$/, 'less-loader');
        createCSSRule('scss', /\.scss$/, 'sass-loader', loaderOptions.scss || {});
        createCSSRule(
            'sass',
            /\.sass$/,
            'sass-loader',
            Object.assign({ indentedSyntax: true }, loaderOptions.sass || {})
        );

        createCSSRule(
            'stylus',
            /\.styl(us)?$/,
            'stylus-loader',
            Object.assign(
                {
                    preferPathResolver: 'webpack',
                },
                loaderOptions.stylus || {}
            )
        );

        // minify extracted CSS
        if (isEnvProd) {
            // inject CSS extraction plugin
            // https://webpack.docschina.org/plugins/mini-css-extract-plugin/
            // https://github.com/webpack-contrib/mini-css-extract-plugin
            if (styleCfg.extract) {
                config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
                    {
                        filename: !isEnvProd ? '[name].css' : 'static/css/[name].[contenthash:8].css',
                        chunkFilename: !isEnvProd ? '[id].css' : 'static/css/[id].[contenthash:8].css',
                    },
                ]);
            }

            // https://github.com/NMFR/optimize-css-assets-webpack-plugin
            const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
            const safePostCssParser = require('postcss-safe-parser');

            config.plugin('minify-css').use(OptimizeCSSAssetsPlugin, [
                {
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        discardComments: { removeAll: true },
                        map: shouldUseSourceMap
                            ? {
                                  // `inline: false` forces the sourcemap to be output into a separate file
                                  inline: false,
                                  // `annotation: true` appends the sourceMappingURL to the end of the css file, helping the browser find the sourcemap
                                  annotation: true,
                              }
                            : false,
                    },
                    cssProcessorPluginOptions: {
                        preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                    },
                    canPrint: true,
                },
            ]);

            // https://github.com/neutrinojs/webpack-chain#config-optimization-minimizers-adding
            config.optimization.minimizer('css').use(OptimizeCSSAssetsPlugin);
        }
    };
};
