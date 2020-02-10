let fs = require('fs');
let join = require('path').join;

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
    finder(resolve(startPath));
    return result;
}

/**
 * @param p 相对路径
 * @returns {String} 当前Node.js进程执行时的工作目录
 */
function resolve(p) {
    return join(process.cwd(), p);
}

exports.findSync = findSync;
exports.resolve = resolve;
