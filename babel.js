// 使用 babel 配置 ts
module.exports = function(api) {
    return {
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
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-transform-typescript',
            'transform-class-properties',
            '@babel/proposal-object-rest-spread',
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    // useBuiltIns: 'usage',
                    // corejs: 3,
                    targets: {
                        chrome: 59,
                        edge: 13,
                        firefox: 50,
                        safari: 8,
                    },
                },
            ],
            [
                '@babel/preset-typescript',
                {
                    allExtensions: true,
                },
            ],
        ],
    };
};
