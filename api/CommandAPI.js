// 抽离脚手架命令行层
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const packageConfig = require('../package.json');
const { cleanArgs, joinPathCWD } = require('../lib');
const boxPath = joinPathCWD('scripts/config/index.js');

const commandName = (exports.commandName = []);
const commandStore = (exports.commandStore = []);
// 配置对象
let boxConfig = {};
// 状态
let status = 'pending';
// 整合config

try {
    // 初始化环境变量
    setEnv();

    if (fs.existsSync(boxPath)) {
        const { base, ...restConfig } = require(boxPath)(boxConfig);
        const { vue, react, typescript, eslint, ESModules } = restConfig;

        Object.assign(boxConfig, {
            // package.json
            appPackageJson: packageConfig,
            ...base,
            ...restConfig,
            isVueEnabled: vue.open,
            isReactEnabled: react.open,
            isTypeScriptEnabled: typescript.open,
            useESModules: ESModules.open,
        });
    }

    program.usage('<command> [options]').version(packageConfig.version);
} catch (error) {
    console.log('配置数据获取失败！', error);
}

module.exports.injectCommand = function(cmd) {
    if (status === 'done') {
        return console.error('注册命令行时机已经是 done，请提前注册～');
    }
    if (typeof cmd !== 'function') {
        return console.error(cmd, '必须是一个函数');
    }
    cmd({ program, boxConfig, commandName, commandStore, cleanArgs, start, setEnv, isMultiPages, execCmd });
};

module.exports.commandComplete = function() {
    commandValidate();
    parse();
    status = 'done';
};

function parse() {
    program.parse(process.argv);
    program.commands.forEach((c) => c.on('--help', () => console.log()));
}

function commandValidate() {
    if (process.argv[2] && !commandName.includes(process.argv[2])) {
        console.log();
        console.log(chalk.red(`  没有找到 ${process.argv[2]} 命令`));
        console.log();
        program.help();
    }

    if (!process.argv[2]) {
        program.help();
    }
}

function setEnv(key, config = boxConfig) {
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
