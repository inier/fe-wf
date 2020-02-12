// babel扩展配置: https://www.babeljs.cn/

module.exports = {
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
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                // useBuiltIns: 'usage',
                // corejs: 3,
                modules: false,
            },
        ],
        [
            '@babel/preset-react',
        ],
    ],
};
