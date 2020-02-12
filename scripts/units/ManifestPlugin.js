// Generate an asset manifest file with the following content:
// - "files" key: Mapping of all asset filenames to their corresponding
//   output file so that tools can pick it up without having to parse
//   `index.html`
// - "entrypoints" key: Array of files which are included in `index.html`,
//   can be used to reconstruct the HTML if necessary
// https://github.com/danethurber/webpack-manifest-plugin

const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = ({ config, resolve, options }) => {
    return () => {
        // 告诉 Webpack 使用动态链接库
        // config.plugin('ManifestPlugin').use(ManifestPlugin, [
        //     {
        //         fileName: 'asset-manifest.json',
        //         publicPath: options.publicPath,
        //         generate: (seed, files, entryPoints) => {
        //             const manifestFiles = files.reduce(
        //                 (manifest, { name, path }) => ({ ...manifest, [name]: path }),
        //                 seed
        //             );
        //             const entryPointsFiles = entryPoints.main.filter((fileName) => !fileName.endsWith('.map'));

        //             return {
        //                 files: manifestFiles,
        //                 entryPoints: entryPointsFiles,
        //             };
        //         },
        //     },
        // ]);
    };
};
