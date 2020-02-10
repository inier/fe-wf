// webpack基础配置

const path = require('path');
const chalk = require('chalk');
const Config = require('webpack-chain');
const { findSync, joinPathCWD, exec, checkCLIOptions } = require('./utils');

const config = new Config();

const files = findSync('config/units');

console.log(chalk.green(`----------------------------------------`));
console.log(chalk.green(`   当前环境[${process.env.npm_lifecycle_event}]：${process.env.NODE_ENV}`));
console.log(chalk.green(`----------------------------------------`));

// 开启 SourceMap
// https://webpack.docschina.org/configuration/devtool/#devtool
if (checkCLIOptions('--map')) {
    let sourcemap = 'none';

    if (process.env.NODE_ENV === 'development') {
        // 开发环境: cheap-module-eval-source-map
        sourcemap = 'cheap-module-eval-source-map';
    } else if (process.env.NODE_ENV === 'production') {
        // 生产环境：cheap-module-source-map
        sourcemap = 'cheap-module-source-map';
    }
    config.devtool(sourcemap);
}

// 构建 dll, 命令行带有--dll
if (checkCLIOptions('--dll')) {
    // 同步执行yarn dll
    exec('yarn dll');
}

module.exports = () => {
    const map = new Map();

    // 整合 units 中的各项配置
    files.map((_) => {
        const name = path.basename(_, '.js');
        return map.set(name, require(_)(config, joinPathCWD));
    });

    map.forEach((v) => v());

    return config;
};
