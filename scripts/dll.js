// 将第三方长期不变的包打包成dll
// https://webpack.docschina.org/plugins/dll-plugin/#dllplugin

module.exports = async function(options) {
    const chalk = require('chalk');
    const ora = require('ora');
    const rimraf = require('rimraf');
    const webpack = require('webpack');
    const Config = require('webpack-chain');
    const { joinPathCWD, rm } = require('../lib');
    const config = new Config();
    const { entry, output } = options.dllCfg || {};
    const dllPath = joinPathCWD(output);

    if (options.report) {
        const BundleAnalyzerPlugin = require('./units/BundleAnalyzerPlugin')({ config, options });
        BundleAnalyzerPlugin();
    }

    options.libs.forEach((item) => {
        config
            .entry(options.name || entry)
            .add(item)
            .end();
    });

    await config
        .mode('production')
        // 指定生成文件所在目录文件夹
        // 注意：打包的dll文件需要通过其他方式引入html
        .output.path(dllPath)
        // 指定文件名
        .filename('dll.[name]_[chunkhash:6].js')
        // 存放动态链接库的全局变量名称，对应 DllPlugin 插件中的 name 属性
        .library('[name]_[chunkhash:6]')
        .end()
        .plugin('DllPlugin')
        .use(webpack.DllPlugin, [
            {
                // 和output.library中一致，值就是输出的manifest.json中的 name值
                name: '[name]_[chunkhash:6]',
                path: joinPathCWD(output, 'manifest.json'),
            },
        ])
        .end();

    // 删除dll目录
    rimraf.sync(dllPath);

    const spinner = ora('开始构建 dll...');
    await spinner.start();

    const webpackConfig = config.toConfig();
    // console.log('webpack配置：', webpackConfig);

    await webpack(webpackConfig, function(err, stats) {
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
            console.log(chalk.red('构建失败\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('dll 构建完成\n'));
    });
};
