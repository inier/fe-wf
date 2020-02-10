// html自动生成
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const commonConfig = require('../common');
const { entry: dllEntry, path: dllPath } = commonConfig.dll;

module.exports = (config, resolve) => {
    return () => {
        config.plugin('html').use(HtmlWebpackPlugin, [
            {
                /*
                template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
                webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是匹配的 loader
                html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名为 index.html
                可以通过 filename 参数指定输出的文件名
                html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
                */
                template: `${commonConfig.path.static}/index.html`,
                filename: 'index.html',
                /*
                因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
                https://github.com/jantimon/html-webpack-plugin/issues/870
                */
                chunksSortMode: 'none',
                xhtml: true,
                minify: {
                    collapseWhitespace: false, //删除空格，但是不会删除SCRIPT、style和textarea中的空格
                    conservativeCollapse: false, //删除空格，总是保留一个空格
                    removeAttributeQuotes: false, //删除引号，删除不需要引号的值
                    useShortDoctype: false, //使用短的文档类型
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeScriptTypeAttributes: true,
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
            },
        ]);

        if (process.argv.includes('--dll')) {
            // 给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
            config.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [
                {
                    // 要添加到编译中的文件的绝对路径
                    filepath: resolve(`${dllPath}/dll.${dllEntry}*.js`),
                    outputPath: dllPath,
                    publicPath: dllPath,
                    includeSourcemap: false,
                },
            ]);
        }
    };
};
