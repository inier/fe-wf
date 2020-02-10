// babel 配置

// https://www.babeljs.cn/

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
            // 配置 js
            // https://www.babeljs.cn/docs/babel-preset-env
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
            // 配置 ts
            // https://www.babeljs.cn/docs/babel-preset-typescript
            [
                '@babel/preset-typescript',
                {
                    allExtensions: true,
                },
            ],
        ],
    };
};
