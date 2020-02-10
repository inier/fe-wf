// webpack生产环境配置
const chalk = require('chalk');
const rimraf = require('rimraf');
const ora = require('ora');
const webpack = require('webpack');
const { resolve } = require('./utils');
const commonConfig = require('./common');

// 删除 dist 目录
rimraf.sync(resolve('dist'));

const config = require('./base')();

// 开启 source map
const sourcemap = commonConfig.sourcemap;
sourcemap && config.devtool(typeof sourcemap === 'string' ? sourcemap : 'cheap-source-map');

const spinner = ora('开始构建项目...');

spinner.start();

webpack(config.toConfig(), function(err, stats) {
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
