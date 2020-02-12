const path = require('path');
const { compact, joinPathCWD } = require('../../lib');
// const babel = require(joinPathCWD('babelrc.js'));

module.exports = (options) => {
    const { isVueEnabled, isReactEnabled, isTypeScriptEnabled, useESModules, isEnvProd, isEnvDev, isEnvTest } = options;
    return {
        presets: compact([
            // 配置 js
            // https://www.babeljs.cn/docs/babel-preset-env
            isEnvTest && [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                },
            ],
            (isEnvProd || isEnvDev) && [
                '@babel/preset-env',
                {
                    useBuiltIns: 'entry',
                    corejs: 3,
                    modules: false,
                    exclude: ['transform-typeof-symbol'],
                },
            ],
            isReactEnabled && [
                '@babel/preset-react',
                {
                    // Adds component stack to warning messages
                    // Adds __self attribute to JSX which React will use for some warnings
                    development: isEnvDev || isEnvTest,
                    // Will use the native built-in instead of trying to polyfill
                    // behavior for any plugins that require one.
                    useBuiltIns: true,
                },
            ],
            // 配置 ts
            // https://www.babeljs.cn/docs/babel-preset-typescript
            isTypeScriptEnabled && [
                '@babel/preset-typescript',
                {
                    allExtensions: true,
                },
            ],
            isVueEnabled && ['@vue/babel-preset-jsx'],
        ]),
        plugins: compact([
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            [
                '@babel/plugin-proposal-class-properties',
                {
                    loose: true,
                },
            ],
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: false,
                    useESModules,
                    version: require('@babel/runtime/package.json').version,
                    absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
                },
            ],
            'babel-plugin-macros',
            '@babel/plugin-transform-typescript',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-object-rest-spread',
        ]),
    };
};
