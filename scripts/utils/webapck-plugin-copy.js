const fs = require('fs-extra');
const globby = require('globby');

class CopyDirWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const opt = this.options;
        compiler.plugin('done', (stats) => {
            if (process.env.NODE_ENV !== 'production') {
                (async () => {
                    const toFilesPath = await globby([`${opt.to}/**`, '!.git/**']);
                    toFilesPath.forEach((filePath) => fs.removeSync(filePath));
                    const fromFilesPath = await globby([`${opt.from}/**`]);

                    fromFilesPath.forEach((fromPath) => {
                        const cachePath = fromPath;
                        const toPath = fromPath.replace(opt.from, opt.to);
                        const dirPaths = toPath.substring(0, toPath.lastIndexOf('/'));
                        fs.mkdirpSync(dirPaths);
                        fs.copyFileSync(cachePath, toPath);
                    });

                    console.log(`  完成copy ${opt.from} to ${opt.to}`);
                })();
            }
        });
    }
}

module.exports = CopyDirWebpackPlugin;
