// webpack开发环境配置
// https://webpack.docschina.org/configuration/dev-server/

module.exports = function(options) {
    const chalk = require('chalk');
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const config = require('./base')(options);
    const port = options.devServer.port || 8080;
    const publicPath = options.publicPath || '/';

    const { proxy = {} } = options.devServer || {};

    config.devServer
        .quiet(true)
        .hot(true)
        .https(false)
        .disableHostCheck(true)
        .publicPath(publicPath)
        .clientLogLevel('none')
        .overlay(true)
        .open(true);

    if (typeof options.chainWebpack === 'function') {
        options.chainWebpack(config);
    }

    const webpackConfig = config.toConfig();
    // console.log('webpack配置：', webpackConfig.module);
    const compiler = webpack(webpackConfig);
    // 拿到 devServer 参数
    const chainDevServer = compiler.options.devServer;
    const server = new WebpackDevServer(compiler, Object.assign(chainDevServer, {}));

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
        process.on(signal, () => {
            server.close(() => {
                process.exit(0);
            });
        });
    });

    // 端口被占用的处理
    const portFinder = require('portfinder');
    portFinder.basePort = process.env.PORT || port;
    portFinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // 在进程中存储下当前最新端口
            process.env.PORT = port;

            // 监听端口
            server.listen(port);
        }
        new Promise(() => {
            compiler.hooks.done.tap('dev', (stats) => {
                const empty = '    ';
                const common = `start running at:
        - Local: http://127.0.0.1:${port}${publicPath}\n`;
                console.log(chalk.cyan(`\n${empty}${common}`));
            });
        });
    });
};
