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
        [
            '@babel/preset-react',
            {
                // Will use the native built-in instead of trying to polyfill
                // behavior for any plugins that require one.
                useBuiltIns: true,
            },
        ],
    ],
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
        '@babel/plugin-proposal-numeric-separator',
        // https://github.com/AlexGilleran/jsx-control-statements
        'jsx-control-statements',
    ],
};
