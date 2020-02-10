// 配置 babel-loader
// https://webpack.docschina.org/loaders/babel-loader/
// https://github.com/babel/babel-loader

const commonConfig = require('../common');

module.exports = (config, resolve) => {
    const baseRule = config.module.rule('js').test(/.jsx?|.tsx?$/);
    const babelPath = resolve('babel.js');
    const babelConf = require(babelPath);
    const version = require(resolve('node_modules/@babel/core/package.json')).version;
    return () => {
        baseRule.include
            .add(resolve(commonConfig.path.src))
            .add(resolve(commonConfig.path.test))
            .end()
            .use('babel')
            .loader(require.resolve('babel-loader'))
            .options(babelConf({ version }));
    };
};
