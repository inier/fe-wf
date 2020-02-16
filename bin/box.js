#!/usr/bin/env node
// https://github.com/tj/commander.js

const chalk = require('chalk');
const program = require('commander');
const packageConfig = require('../package.json');
const { cleanArgs, joinPathCWD } = require('../lib');

const __name__ = `prod,dev,dll,ssr,prod_ssr,ssr_server`;
// 避免重复执行
let lock = false;
// 配置对象
let boxConf = {};
// version
const version = packageConfig.version;

function setEnv(key, config = boxConf) {
    if (key && ['production', 'development', 'test'].includes(key)) {
        process.env.NODE_ENV = key;
    }

    Object.assign(config, {
        // 生产环境
        isEnvProd: process.env.NODE_ENV === 'production',
        // 开发环境
        isEnvDev: process.env.NODE_ENV === 'development',
        // 测试环境
        isEnvTest: process.env.NODE_ENV === 'test',
    });
}

// 判断是否为空对象
function isNotEmptyObj(obj) {
    if (obj && typeof obj === 'object' && Object.keys(obj).length > 0) {
        return obj;
    }
    return false;
}

// 判断是否多页面
function isMultiPages(name, boxConf, options) {
    return !(name && options.spa) && (isNotEmptyObj(boxConf.pages) || typeof boxConf.entry === 'object');
}

function start(name = process.env.npm_lifecycle_event) {
    console.log(`----------------------------------------`);
    console.log(`   当前环境[${name}]：${process.env.NODE_ENV}`);
    console.log(`----------------------------------------`);
}

// 整合config
try {
    // 初始化环境变量
    setEnv();

    const { base, ...restConfig } = require(joinPathCWD('scripts/config/index.js'))(boxConf);
    const { vue, react, typescript, eslint, ESModules } = restConfig;

    Object.assign(boxConf, {
        // package.json
        appPackageJson: packageConfig,
        ...base,
        ...restConfig,
        isVueEnabled: vue.open,
        isReactEnabled: react.open,
        isTypeScriptEnabled: typescript.open,
        isEslintEnabled: eslint.open,
        useESModules: ESModules.open,
    });
} catch (error) {
    console.log('配置数据获取失败！', error);
}

// 执行指定的回调（带多页处理）
function execCmd(args, cb, isDev = false) {
    if (args.isMultiPages) {
        // 多页面时标记需清除
        args.clear = true;
        const { name, pages, entry } = args;
        const multiPages = isNotEmptyObj(pages) || isNotEmptyObj(entry);

        if (name) {
            args.entry = multiPages[name].entry;

            cb && cb();
        } else {
            multiPages &&
                Object.keys(multiPages).forEach((page, index) => {
                    args.name = page;
                    args.entry = multiPages[page].entry;
                    if (isDev) {
                        args.devServer.port = args.devServer.port + index;
                    }
                    cb && cb();
                });
        }
    } else {
        cb && cb();
    }
}

// 命令
program
    .usage('<command> [options]')
    .version(version)
    .command('prod [pageName]')
    .description(`生产环境构建`)
    .option('-r, --report', '打包分析报告')
    .option('-g, --gzip', '开启Gzip')
    .option('-m, --map', '开启SourceMap')
    .option('-u, --debug', '开启移动端调试')
    .option('-d, --dll', '合并dll差分包')
    .option('-s, --sep', '合并dll差分包时，多页面分开部署')
    .option('-p, --spa', '多页面开发中采用SPA单页打包,代码会输出到根目录(默认会生成name命名的目录)')
    .action(async (name, cmd) => {
        if (lock) {
            return;
        }
        lock = true;

        setEnv('production');

        const options = cleanArgs(cmd);
        const args = Object.assign(
            options,
            { cmd: cmd._name, name, isMultiPages: isMultiPages(name, boxConf, options) },
            boxConf
        );

        start(args.cmd);
        if (args.dll) {
            require('../scripts/dll')(args);
        }
        execCmd(args, () => {
            require('../scripts/prod')(args);
        });
    });

program
    .usage('<command> [options]')
    .version(version)
    .command('dev [pageName]')
    .description(`开发环境构建`)
    .option('-d, --dll', '合并差分包')
    .option('-m, --map', '开启SourceMap')
    .option('-u, --debug', '开启移动端调试')
    .option('-p, --spa', '多页面开发中采用SPA单页打包,代码会输出到根目录(默认会生成name命名的目录)')
    .action(async (name, cmd) => {
        if (lock) {
            return;
        }
        lock = true;

        setEnv('development');

        const options = cleanArgs(cmd);
        const args = Object.assign(
            options,
            { cmd: cmd._name, name, isMultiPages: isMultiPages(name, boxConf, options) },
            boxConf
        );

        start(args.cmd);
        if (args.dll) {
            require('../scripts/dll')(args);
        }
        execCmd(
            args,
            () => {
                require('../scripts/dev')(args);
            },
            true
        );
    });

program
    .usage('<command> [options]')
    .version(version)
    .command('prod_ssr [pageName]')
    .description(`服务端渲染`)
    .option('-r, --report', '打包分析报告')
    .option('-m, --map', '开启SourceMap')
    .action(async (name, cmd) => {
        if (lock) {
            return;
        }
        lock = true;

        const options = cleanArgs(cmd);
        const args = Object.assign(options, { cmd: cmd._name, name }, boxConf);

        start(args.cmd);
        if (args.dll) {
            require('../scripts/dll')(args);
        }
        require('../scripts/ssr')(args);
    });

program
    .usage('<command> [options]')
    .version(version)
    .command('ssr_server [pageName]')
    .description(`服务端渲染 server 端运行`)
    .action(async (name, cmd) => {
        if (lock) {
            return;
        }
        lock = true;

        const options = cleanArgs(cmd);
        const args = Object.assign(options, { cmd: cmd._name, name }, boxConf);

        start(args.cmd);
        if (args.dll) {
            require('../scripts/dll')(args);
        }
        require('../scripts/ssr-server')(args);
    });

program
    .usage('<command> [options]')
    .version(version)
    .command('dll [pageName]')
    .description(`编译差分包`)
    .option('-r, --report', '打包分析报告')
    .action(async (name, cmd) => {
        if (lock) {
            return;
        }
        lock = true;

        const options = cleanArgs(cmd);
        const args = Object.assign(options, { cmd: cmd._name, name }, boxConf);

        start(args.cmd);
        require('../scripts/dll')(args);
    });

program.parse(process.argv).args && program.parse(process.argv).args[0];
program.commands.forEach((c) => c.on('--help', () => console.log()));

if (process.argv[2] && !__name__.includes(process.argv[2])) {
    console.log();
    console.log(chalk.red(`  没有找到 ${process.argv[2]} 命令`));
    console.log();
    program.help();
}

if (!process.argv[2]) {
    program.help();
}
