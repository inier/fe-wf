// babel扩展配置: https://www.babeljs.cn/

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: { version: 3, proposals: true },
                modules: false,
                exclude: ['transform-typeof-symbol'],
            },
        ],
        // https://www.babeljs.cn/docs/babel-preset-react
        [
            '@babel/preset-react',
            {
                // Will use the native built-in instead of trying to polyfill
                // behavior for any plugins that require one.
                useBuiltIns: true,
            },
        ],
        // https://github.com/vuejs/jsx/tree/dev/packages/babel-preset-jsx
        '@vue/babel-preset-jsx',
        // 配置 ts
        // https://www.babeljs.cn/docs/babel-preset-typescript
        // [
        //     '@babel/preset-typescript',
        //     {
        //         allExtensions: true,
        //     },
        // ],
    ],
    // https://babeljs.io/docs/en/plugins
    plugins: [
        [
            'import',
            {
                libraryName: 'lodash-es',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lodash',
        ],
        // '@babel/plugin-syntax-dynamic-import',
        //https://babeljs.io/docs/en/babel-plugin-proposal-decorators
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
        'babel-plugin-macros',
        // '@babel/plugin-transform-typescript',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-object-rest-spread',
    ],
};
