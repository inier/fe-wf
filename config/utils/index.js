// 工具方法集合
// https://github.com/shelljs/shelljs

const fs = require('fs');
const join = require('path').join;
const { rm, exec } = require('shelljs');

/**
 * @param startPath 起始目录路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result = [];
    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
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
    return join.apply(this, [process.cwd(), ...arguments]);
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

module.exports = {
    rm,
    exec,
    findSync,
    joinPathCWD,
    checkCLIOptions,
    isExistDirectory,
};
