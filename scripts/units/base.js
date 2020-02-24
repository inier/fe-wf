// [基础配置]

module.exports = ({ config, webpackVersion, resolve, options }) => {
    const {
        name = 'index',
        dist,
        entry,
        publicPath = '/',
        isEnvProd,
        isEnvDev,
        map: shouldUseSourceMap,
        appPackageJson,
        isMultiPages,
        externals = {},
        extensions = [],
    } = options;
    let tDist = dist;

    if (isMultiPages) {
        tDist = `${dist}/${name}`;
    }

    return () => {
        //== mode  "production" | "development" | "none"
        config.mode(process.env.NODE_ENV);

        //== base entry & output
        // base entry
        if (typeof entry === 'string') {
            config
                // 入口名称
                .entry(name)
                // 入口路径
                .add(resolve(entry))
                .end()
                .cache({
                    type: 'filesystem',
                });
        } else if (typeof entry === 'object') {
            Object.keys(entry).forEach((item) => {
                config
                    // 入口名称
                    .entry(item)
                    // 入口路径
                    .add(resolve(entry[item]))
                    .end()
                    .cache({
                        type: 'filesystem',
                    });
            });
        }

        // output
        const filename = isEnvProd ? 'static/js/[name].[chunkhash:8].js' : 'static/js/bundle.js';
        const chunkFilename = isEnvProd ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].chunk.js';

        config.output
            .path(resolve(tDist))
            // Add /* filename */ comments to generated require()s in the output.
            // .pathinfo(isEnvDev)
            .filename(filename)
            .chunkFilename(chunkFilename)
            .publicPath(publicPath)
            // .libraryTarget('umd')
            // .umdNamedDefine(true)
            // .library('library')
            .jsonpFunction(`webpackJsonp${appPackageJson.name}`)
            .globalObject('this');

        if (parseInt(webpackVersion) === 5) {
            config.output.set('ecmaVersion', 6);
        }

        // 开启 SourceMap
        // https://webpack.docschina.org/configuration/devtool/#devtool
        if (shouldUseSourceMap) {
            let sourcemap = 'none';

            if (isEnvDev) {
                // 开发环境: cheap-module-eval-source-map
                sourcemap = 'cheap-module-eval-source-map';
            } else if (isEnvProd) {
                // 生产环境：cheap-module-source-map
                sourcemap = 'cheap-module-source-map';
            }

            config.devtool(sourcemap);
        }

        // externals
        Object.keys(externals).length && config.externals(externals);

        // extensions
        extensions.map((item) => {
            config.resolve.extensions.add(item);
        });
    };
};
