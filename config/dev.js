// webpack开发环境配置
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./base')();
const commonConfig = require('./common');

config.devServer
    .quiet(true)
    .hot(true)
    .https(false)
    .disableHostCheck(true)
    // .publicPath(commonConfig.publicPath)
    .clientLogLevel('none');

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
server.listen(commonConfig.server.port);

new Promise(() => {
    compiler.hooks.done.tap('dev', (stats) => {
        const empty = '    ';
        const common = `start running at:
    - Local: http://127.0.0.1:${commonConfig.server.port}${commonConfig.publicPath}\n`;
        console.log(chalk.cyan(`\n${empty}${common}`));
    });
});
