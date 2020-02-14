// 静态资源处理

module.exports = ({ config }) => {
    return () => {
        config.module
            .rule()
            .test(/\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'assets/img/',
            })
            .end();

        const imageMinWebpackPlugin = require('imagemin-webpack-plugin').default;

        config
            .plugin('imagemin')
            .use(imageMinWebpackPlugin, [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    disable: config.get('mode') !== 'production',
                    pngquant: {
                        quality: '60-80',
                    },
                },
            ])
            .end()
            .plugin('default-imagemin')
            .use(imageMinWebpackPlugin, [{ test: '../src/assets/img/**' }]);
    };
};
