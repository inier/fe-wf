// [别名配置]

module.exports = ({ config, resolve, options }) => {
    const fs = require('fs');
    const { alias } = options;
    return () => {
        // 生成默认别名
        const dirs = fs.readdirSync(resolve('src'));
        let aliasConfig = config.resolve.extensions
            .merge(['.mjs', '.js', '.jsx', '.vue', 'ts', 'tsx', '.json', '.wasm'])
            .end().alias;
        dirs.forEach((v) => {
            const stat = fs.statSync(resolve(`src/${v}`));
            if (stat.isDirectory()) {
                aliasConfig.set(`@${v}`, resolve(`src/${v}`));
            }
        });

        // 用户配置别名
        Object.keys(alias).forEach((key) => {
            let path = key.includes('/') ? alias[key] + '/' : alias[key];
            aliasConfig.set(key, path);
        });

        // 自定义设置别名
        // aliasConfig.set('@', resolve('src')).set('@src', resolve('src'));
    };
};
