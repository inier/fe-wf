// webpack基础配置
const path = require('path');
const chalk = require('chalk');
const Config = require('webpack-chain');
const { findSync, resolve } = require('./utils');

const config = new Config();

const files = findSync('config/units');

console.log(chalk.green(`----------------------------------------`));
console.log(chalk.green(`   当前环境[${process.env.npm_lifecycle_event}]：${process.env.NODE_ENV}`));
console.log(chalk.green(`----------------------------------------`));

module.exports = () => {
    const map = new Map();

    // 整合units中的各项配置
    files.map((_) => {
        const name = path.basename(_, '.js');
        return map.set(name, require(_)(config, resolve));
    });

    map.forEach((v) => v());

    return config;
};
