// 将第三方长期不变的包打包成dll
// https://webpack.docschina.org/plugins/dll-plugin/#dllplugin

const chalk = require('chalk');
const ora = require('ora');
const rimraf = require('rimraf');
const webpack = require('webpack');
const Config = require('webpack-chain');
const { joinPathCWD,rm } = require('./utils');
const commonConfig = require('./common');

const config = new Config();

const BundleAnalyzerPlugin = require('./units/BundleAnalyzerPlugin')(config);
BundleAnalyzerPlugin();

const { entry, path, vendors } = commonConfig.dll;
const dllPath = joinPathCWD(path);

config
    .entry(entry)
    .add(vendors[0])
    .add(vendors[1])
    .end()
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
            path: joinPathCWD(`${path}/manifest.json`),
        },
    ])
    .end();

// 删除dll目录
// rimraf.sync();
rm("-rf", joinPathCWD(path));
const spinner = ora('开始构建 dll...');
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
        console.log(chalk.red('构建失败\n'));
        process.exit(1);
    }

    console.log(chalk.cyan('dll 构建完成\n'));
});
