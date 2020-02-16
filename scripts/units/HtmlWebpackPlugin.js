// 自动生成HTML

module.exports = ({ config, resolve, options }) => {
    const { name = 'index', pages = {}, html = {}, publicPath } = options;

    return async () => {
        // html生成
        // https://webpack.docschina.org/plugins/html-webpack-plugin/
        // https://github.com/jantimon/html-webpack-plugin
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        const { rootId, title: defaultTitle, favicon, template: defaultTemplate } = html;

        // 默认模板配置
        const htmlOption = {
            appMountId: rootId,
            favicon: resolve(favicon),
            title: defaultTitle,
            filename: `${name}.html`,
            template: defaultTemplate,
            publicPath,
            minify: {
                removeComments: true,
                useShortDoctype: false, //使用短的文档类型
                collapseWhitespace: false, //删除空格，但是不会删除SCRIPT、style和textarea中的空格
                conservativeCollapse: false, //删除空格，总是保留一个空格
                removeAttributeQuotes: false, //删除引号，删除不需要引号的值
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
        };

        if (Object.keys(pages).length) {
            const {
                title = defaultTitle,
                filename = `${name}.html`,
                template = defaultTemplate,
                publicPath = '',
                ...restOptions
            } = pages[name] || {};

            Object.assign(
                htmlOption,
                {
                    title,
                    filename,
                    publicPath,
                    // template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
                    // webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是匹配的 loader
                    // html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名为 index.html
                    // 可以通过 filename 参数指定输出的文件名
                    // html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
                    // https://github.com/jaketrent/html-webpack-template
                    template: template ? resolve(template) : require('html-webpack-template'),
                },
                restOptions
            );
        }

        config.plugin('html').use(HtmlWebpackPlugin, [htmlOption]);

        // 将dll打包后的js文件注入到生成的 html 中
        if (options.dll) {
            const { entry, output: dllPath } = options.dllCfg || {};
            const dllEntry = options.name || entry;

            if (options.sep) {
                // https://github.com/SimenB/add-asset-html-webpack-plugin
                const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

                config.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [
                    {
                        // 要添加到编译中的文件的绝对路径，*通配带hash的文件
                        filepath: resolve(`${dllPath}/dll.${dllEntry}*.js`),
                        outputPath: dllPath,
                        publicPath: dllPath,
                        includeSourcemap: false,
                    },
                ]);
            } else {
                // 复制文件
                // https://webpack.docschina.org/plugins/copy-webpack-plugin/
                const CopyPlugin = require('copy-webpack-plugin');
                await config
                    .plugin('CopyPlugin')
                    .use(CopyPlugin, [[{ from: resolve(dllPath), to: resolve(options.dist, dllPath) }]]);

                // https://github.com/jharris4/html-webpack-tags-plugin
                const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

                await config.plugin('HtmlWebpackTagsPlugin').use(HtmlWebpackTagsPlugin, [
                    {
                        tags: [
                            {
                                // 打包单页且指定了spa参数时，项目会打包到输出目录的根目录中，需要改变dll的引入路径
                                path: `${options.name && options.spa ? '' : '../'}${dllPath}`,
                                glob: `dll.${dllEntry}*.js`,
                                globPath: dllPath,
                            },
                        ],
                        append: false,
                    },
                ]);
            }
        }
    };
};
