// 配置 babel-loader
// https://webpack.docschina.org/loaders/babel-loader/
// https://github.com/babel/babel-loader

module.exports = ({ config, resolve, options }) => {
    const babelConfig = require(resolve('scripts/config/babel.js'))(options);
    const { isVueEnabled, isReactEnabled, isTypeScriptEnabled } = options;
    console.dir(babelConfig);
    // vue & tsx & jsx Rule
    function createJSRule(lang, test, loader, options = {}, exclude = [], enforce) {
        const baseRule = config.module.rule(lang).test(test);

        baseRule.include
            .add(resolve('src'))
            .add(resolve('test'))
            .end()
            .exclude.add(/node_modules/)
            .end()
            .use(loader)
            .loader(loader)
            .options(options);

        if (enforce) {
            baseRule.enforce(enforce);
        }
    }

    return () => {
        let tsOptions = null;

        createJSRule('js', /\.jsx?$/, 'babel-loader', babelConfig);

        if (isVueEnabled) {
            createJSRule('vue', /\.vue$/, 'vue-loader');

            config.plugin('vue').use(require('vue-loader/lib/plugin'));

            tsOptions = {
                appendTsSuffixTo: [/\.vue$/],
                reportFiles: ['src/**/*.{ts,tsx}'],
            };
        }

        if (isTypeScriptEnabled) {
            if (isVueEnabled) {
                createJSRule('vts', /\.tsx?$/, 'ts-loader', tsOptions);
            }
            if (isReactEnabled) {
                createJSRule('tsx', /\.tsx?$/, 'awesome-typescript-loader', {
                    reportFiles: ['src/**/*.{ts,tsx}'],
                });
            }
            if (!isVueEnabled && !isReactEnabled) {
                createJSRule('ts', /\.ts$/, 'ts-loader');
            }
        }

        if (isReactEnabled && isTypeScriptEnabled) {
            createJSRule('js', /\.js$/, 'source-map-loader', {}, [], 'pre');
        }
    };
};
