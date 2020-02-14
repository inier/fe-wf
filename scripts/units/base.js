// 基础配置

module.exports = ({ config, resolve, options }) => {
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
        alias = {},
        externals = {},
        extensions = [],
    } = options;
    let tDist = dist;

    if (isMultiPages) {
        tDist = `${dist}/${name}`;
    }

    return () => {
        //== 模式 "production" | "development" | "none"
        config.mode(process.env.NODE_ENV);

        //== base entry & output
        // base entry
        config
            // 入口名称
            .entry(name)
            // 入口路径
            .add(resolve(entry))
            .end();

        // output
        const filename = isEnvProd ? 'static/js/[name].[chunkhash:8].js' : 'static/js/bundle.js';
        const chunkFilename = isEnvProd ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].chunk.js';

        config.output
            .path(resolve(tDist))
            // Add /* filename */ comments to generated require()s in the output.
            // .pathinfo(isEnvDev)
            .publicPath(publicPath)
            .filename(filename)
            .chunkFilename(chunkFilename)
            // .libraryTarget('umd')
            // .umdNamedDefine(true)
            // .library('library')
            .jsonpFunction(`webpackJsonp${appPackageJson.name}`)
            .globalObject('this');

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

        // alias
        Object.keys(alias).forEach((key) => {
            let path = key.includes('/') ? alias[key] + '/' : alias[key];
            config.resolve.alias.set(key, path);
        });

        // extensions
        extensions.map((item) => {
            config.resolve.extensions.add(item);
        });
    };
};
