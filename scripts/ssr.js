module.exports = function(options) {
    const chalk = require('chalk');
    const rimraf = require('rimraf');
    const ora = require('ora');
    const webpack = require('webpack');
    const Config = require('webpack-chain');
    const { joinPathCWD, rm } = require('../lib');
    const config = new Config();
    const PATHS = {
        build: joinPathCWD('static'),
        ssrDemo: joinPathCWD('src', 'ssr.jsx'),
    };

    if (options.report) {
        const BundleAnalyzerPlugin = require('./units/BundleAnalyzerPlugin')({ config, options });
        BundleAnalyzerPlugin();
    }

    require('./units/babelLoader')({ config, resolve: joinPathCWD, options: { ...options, name: 'ssr' } })();
    require('./units/HtmlWebpackPlugin')({
        config,
        resolve: joinPathCWD,
        options: {
            ...options,
            name: 'ssr',
            dist: 'static',
            html: {
                ...options.html,
                publicPath: '/',
                filename: 'client.ssr.html',
            },
        },
    })();

    config
        .entry('ssr')
        .add(PATHS.ssrDemo)
        .end()
        .mode('development') //  production
        .output.path(PATHS.build)
        .filename('[name].js')
        .libraryTarget('umd')
        .globalObject('this')
        .library('[name]')
        .end();

    rimraf.sync(PATHS.build);

    const spinner = ora('开始 SSR 构建...');
    spinner.start();

    webpack(config.toConfig(), function(err, stats) {
        spinner.stop();

        if (err) {
            throw err;
        }

        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            }) + '\n\n'
        );

        if (stats.hasErrors()) {
            console.log(chalk.red('SSR 构建失败\n'));
            process.exit(1);
        }
        console.log(chalk.cyan('SSR 构建完成\n'));
    });
};
