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
                    corejs: { version: 3, proposals: true },
                    modules: false,
                    exclude: ['transform-typeof-symbol'],
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
            // https://www.babeljs.cn/docs/babel-preset-react
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
            // https://github.com/vuejs/jsx/tree/dev/packages/babel-preset-jsx
            isVueEnabled && ['@vue/babel-preset-jsx'],
        ]),
        // https://babeljs.io/docs/en/plugins
        plugins: compact([
            // https://babeljs.io/docs/en/babel-plugin-transform-runtime
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: false,
                    useESModules,
                    version: require('@babel/runtime/package.json').version,
                    absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
                },
            ],
            '@babel/plugin-syntax-dynamic-import',
            // https://babeljs.io/docs/en/babel-plugin-proposal-decorators
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            [
                '@babel/plugin-proposal-class-properties',
                {
                    loose: true,
                },
            ],
            'babel-plugin-macros',
            '@babel/plugin-proposal-numeric-separator',
        ]),
    };
};
