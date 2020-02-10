// 基础配置
const commonConfig = require('../common');

module.exports = (config, resolve) => {
    return () => {
        config
            // 入口名称
            .entry('app')
            // 入口路径
            .add(resolve(`${commonConfig.path.src}/index.js`))
            .end()
            // 模式 "production" | "development" | "none"
            .mode(process.env.NODE_ENV)
            // 出口
            .output.path(resolve(commonConfig.path.dist))
            .publicPath(commonConfig.publicPath)
            .filename('[name].bundle.js');
    };
};
