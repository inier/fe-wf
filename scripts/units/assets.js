// [静态资源处理 images、svg、media、fonts]

module.exports = ({ config, webpackVersion, resolve, options }) => {
    const { limit, hash, path, quality } = options.assets;
    return () => {
        const getAssetPath = require('../utils/getAssetPath');

        const genAssetSubPath = (dir) => {
            return getAssetPath(options, `${dir}/[name]${hash ? '.[hash:8]' : ''}.[ext]`);
        };

        const genUrlLoaderOptions = (dir) => {
            return {
                limit: limit,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: genAssetSubPath(dir),
                    },
                },
            };
        };

        config.module
            .rule('images')
            .test(/\.(jpe?g|png|gif|webp)(\?.*)?$/)
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .options(genUrlLoaderOptions('img'));

        // do not base64-inline SVGs.
        // https://github.com/facebookincubator/create-react-app/pull/1180
        config.module
            .rule('svg')
            .test(/\.(svg)(\?.*)?$/)
            .use('file-loader')
            .loader(require.resolve('file-loader'))
            .options({
                name: genAssetSubPath('img'),
            });

        config.module
            .rule('media')
            .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .options(genUrlLoaderOptions('media'));

        config.module
            .rule('fonts')
            .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .options(genUrlLoaderOptions('fonts'));

        // 图片压缩
        // https://github.com/Klathmon/imagemin-webpack-plugin
        const imageMinWebpackPlugin = require('imagemin-webpack-plugin').default;
        config
            .plugin('imagemin')
            .use(imageMinWebpackPlugin, [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    disable: config.get('mode') !== 'production',
                    pngquant: {
                        quality: quality,
                    },
                },
            ])
            .end()
            .plugin('default-imagemin')
            .use(imageMinWebpackPlugin, [{ test: resolve(`src/${path}/img/**`) }]);
    };
};
