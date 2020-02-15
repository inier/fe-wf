// copy assets file(s)
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ config, resolve, options }) => {
    return async () => {
        // const copyAssetsOptions = {
        //     from: resolve('src/static/'),
        //     to: resolve(options.dist, 'static'),
        //     toType: 'dir',
        //     ignore: ['*.md'],
        // };

        // await config.plugin('copy').use(CopyWebpackPlugin, [[copyAssetsOptions]]);
    };
};
