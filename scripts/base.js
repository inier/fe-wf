// webpack基础配置

module.exports = (options) => {
    const path = require('path');
    const Config = require('webpack-chain');
    const { findSync, joinPathCWD } = require('../lib');

    const config = new Config();

    const files = findSync('scripts/units');
    const map = new Map();

    // 整合 units 中的各项配置
    files.map((_) => {
        const name = path.basename(_, '.js');
        return map.set(name, require(_)({ config, resolve: joinPathCWD, options }));
    });

    map.forEach(async (v) => await v());

    return config;
};
