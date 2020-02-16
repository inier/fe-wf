// copy assets file(s)

module.exports = ({ config, resolve, options }) => {
    // const CopyWebpackPlugin = require('copy-webpack-plugin');
    const CopyWebpackPlugin = require(resolve('scripts/utils/webapck-plugin-copy'));

    return () => {
        // const copyAssetsOptions = {
        //     from: 'src/static',
        //     to: options.name ? `dist/${options.name}/statics` : 'dist/statics',
        //     // toType: 'dir',
        //     // ignore: ['*.md'],
        // };

        // config.plugin('copy').use(CopyWebpackPlugin, [copyAssetsOptions]);
    };
};
