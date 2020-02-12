// 配置样式，style，css、less、sass、postcss 等
// https://webpack.docschina.org/loaders/style-loader/
// https://webpack.docschina.org/loaders/css-loader/
// https://webpack.docschina.org/loaders/postcss-loader/
// https://webpack.docschina.org/loaders/sass-loader/
// https://webpack.docschina.org/loaders/less-loader/

module.exports = ({ config, options }) => {
    const { style: styleCfg = {}, isEnvDev, map: shouldUseSourceMap } = options;
    const createCSSRule = (lang, test, loader, CSSRuleOptions = {}) => {
        const baseRule = config.module.rule(lang).test(test);
        const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/);
        const normalRule = baseRule.oneOf('normal');

        function applyLoaders(rule, isModules) {
            rule.use('extract-css-loader')
                .loader(require('mini-css-extract-plugin').loader)
                .options({
                    hmr: isEnvDev,
                    publicPath: '/',
                });

            rule.use('css-loader')
                .loader(require.resolve('css-loader'))
                .options({
                    modules: isModules,
                    sourceMap: shouldUseSourceMap,
                });

            rule.use('postcss-loader')
                .loader(require.resolve('postcss-loader'))
                .options(
                    Object.assign(
                        {
                            plugins: [require('autoprefixer')],
                            sourceMap: shouldUseSourceMap,
                        },
                        styleCfg.postcss
                    )
                );

            if (loader) {
                const rs = require.resolve(loader);
                rule.use(loader)
                    .loader(rs)
                    .options(CSSRuleOptions);
            }
        }

        applyLoaders(modulesRule, true);
        applyLoaders(normalRule, false);
    };

    return () => {
        createCSSRule('css', /\.css$/);
        createCSSRule('postcss', /\.p(ost)?css$/);
        createCSSRule('scss', /\.scss$/, 'sass-loader', styleCfg.scss || {});
        createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign({ indentedSyntax: true }, styleCfg.sass || {}));
        createCSSRule('less', /\.less$/, 'less-loader', styleCfg.less || {});
        createCSSRule(
            'stylus',
            /\.styl(us)?$/,
            'stylus-loader',
            Object.assign(
                {
                    preferPathResolver: 'webpack',
                },
                styleCfg.stylus || {}
            )
        );
    };
};
