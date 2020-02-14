// 工具方法集合
// https://github.com/shelljs/shelljs

const fs = require('fs');
const path = require('path');
const { rm, exec } = require('shelljs');

/**
 * @param startPath 起始目录路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result = [];

    function finder(p) {
        let files = fs.readdirSync(p);
        files.forEach((val, index) => {
            let fPath = path.join(p, val);
            let stats = fs.statSync(fPath);

            if (stats.isDirectory()) {
                finder(fPath);
            }
            if (stats.isFile()) {
                result.push(fPath);
            }
        });
    }

    finder(joinPathCWD(startPath));

    return result;
}

/**
 * @returns {String} 当前Node.js进程执行时的工作目录
 */
function joinPathCWD() {
    return path.join.apply(path, [process.cwd(), ...arguments]);
}

function resolve(fileDir) {
    if (typeof fileDir !== 'String') {
        return;
    }
    return path.resolve(__dirname, fileDir);
}

function isExistFile(dir) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dir)) {
            console.log('存在该路径: ', dir);
            resolve('exist');
        } else {
            reject('not exist');
        }
    });
}
function isFileDirectory(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if (stat.isDirectory()) {
                resolve('directory');
            } else {
                reject('not a directory');
            }
        });
    });
}

/**
 * @param dir 检查目录是否存在
 * @returns {Boolean} 是否存在
 */
function isExistDirectory(dir) {
    return isExistFile(dir).then(() => {
        return isFileDirectory(dir);
    });
}

/**
 * 检查命令行是否带有指定的flag标记
 * @param flag 标记
 * @returns {Boolean} 是否带有标记
 */
function checkCLIOptions(flag) {
    if (process.argv.includes(flag)) {
        return true;
    }
    return false;
}

/**
 * 清理命令行中的参数
 * @param cmd 命令行
 * @returns {Object} 参数集合
 */
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach((o) => {
        const key = camelize(o.long.replace(/^--/, ''));
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    });
    return args;
}

/**
 * 驼峰化字符串
 * @param str str
 * @returns {Object} 处理后的字符串
 */
function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 获取script标签字符串
 * @param {String} source  源目标目录
 * @param {String} targetDir 生成的文件夹
 * @returns {String} 指定文件夹下的文件的标签
 */
function getConfigScript(source, targetDir) {
    if (!isGlobalConfig) {
        return undefined;
    }

    if (!targetDir.endsWith('/')) {
        targetDir = targetDir + '/';
    }
    if (targetDir === '/') {
        targetDir = './';
    }

    let configFiles = fs.readdirSync(path.resolve(__dirname, source), {});

    let jsFiles = configFiles.filter((file) => {
        return file.endsWith('.js') !== -1;
    });
    let cssFiles = configFiles.filter((file) => {
        return file.endsWith('.css');
    });

    let scripts = jsFiles.map((file) => {
        return `<script src='${targetDir + file}'></script>`;
    });
    let links = cssFiles.map((link) => {
        return `<link rel='stylesheet' href='${targetDir + link}' />`;
    });

    return links.concat(scripts).join('\n');
}

// 去除数组中的假值（0, 空, undefined, null, false）
const compact = (arr) => arr.filter((item) => Boolean(item));

module.exports = {
    rm,
    exec,
    findSync,
    joinPathCWD,
    checkCLIOptions,
    isExistDirectory,
    cleanArgs,
    getConfigScript,
    compact,
};
