// webpack生产环境配置
// https://webpack.docschina.org/concepts/

const chalk = require('chalk');
const ora = require('ora');
const webpack = require('webpack');
// const rimraf = require('rimraf');
// const { joinPathCWD } = require('../lib');

module.exports = async function(options) {
    // 删除 dist 目录
    // options.clear && rimraf.sync(joinPathCWD('dist'));

    const config = require('./base')(options);

    const spinner = ora('开始构建项目...');
    spinner.start();

    if (typeof options.chainWebpack === 'function') {
        options.chainWebpack(config);
    }

    const webpackConfig = config.toConfig();
    // console.log('webpack配置：', webpackConfig);

    webpack(webpackConfig, function(err, stats) {
        spinner.stop();

        if (err) {
            throw err;
        }

        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            }) + '\n\n'
        );

        if (stats.hasErrors()) {
            console.log(chalk.red('构建失败\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('build完成\n'));
    });
};
