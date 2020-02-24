// webpack基础配置

const path = require('path');
const Config = require('webpack-chain');
const { findSync, joinPathCWD } = require('../lib');
const PluginAPI = require('../api/PluginAPI');
const webpackVersion = require(joinPathCWD('node_modules/webpack/package.json')).version;

module.exports = (options) => {
    const files = findSync('scripts/units');
    const config = new Config();
    const map = new Map();

    // 整合 units 中的各项配置
    files.map((_) => {
        const name = path.basename(_, '.js');
        return map.set(name, require(_)({ config, webpackVersion, resolve: joinPathCWD, options, api: PluginAPI }));
    });

    map.forEach(async (v) => await v());

    return config;
};
