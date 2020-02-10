// 配置样式，style，css、less、sass、postcss 等
// https://webpack.docschina.org/loaders/style-loader/
// https://webpack.docschina.org/loaders/css-loader/
// https://webpack.docschina.org/loaders/postcss-loader/
// https://webpack.docschina.org/loaders/sass-loader/
// https://webpack.docschina.org/loaders/less-loader/

module.exports = (config, resolve) => {
    const createCSSRule = (lang, test, loader, options = {}) => {
        const baseRule = config.module.rule(lang).test(test);
        const normalRule = baseRule.oneOf('normal');

        normalRule
            .use('extract-css-loader')
            .loader(require('mini-css-extract-plugin').loader)
            .options({
                hmr: process.env.NODE_ENV === 'development',
                publicPath: '/',
            });

        normalRule
            .use('css-loader')
            .loader(require.resolve('css-loader'))
            .options({});

        normalRule.use('postcss-loader').loader(require.resolve('postcss-loader'));

        if (loader) {
            const rs = require.resolve(loader);
            normalRule
                .use(loader)
                .loader(rs)
                .options(options);
        }
    };

    return () => {
        createCSSRule('css', /\.css$/, 'css-loader', {});
        createCSSRule('less', /\.less$/, 'less-loader', {});
        createCSSRule('scss', /\.scss$/, 'sass-loader', {});
        createCSSRule('postcss', /\.p(ost)?css$/);
    };
};
