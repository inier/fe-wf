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
        .open(true);

    if (typeof options.chainWebpack === 'function') {
        options.chainWebpack(config);
    }

    const compiler = webpack(config.toConfig());
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

    // 监听端口
    server.listen(port);

    new Promise(() => {
        compiler.hooks.done.tap('dev', (stats) => {
            const empty = '    ';
            const common = `start running at:
    - Local: http://127.0.0.1:${port}${publicPath}\n`;
            console.log(chalk.cyan(`\n${empty}${common}`));
        });
    });
};
