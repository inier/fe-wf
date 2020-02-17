// 基础配置
const path = require('path');
const { joinPathCWD } = require('../../lib');
const userConfig = require(joinPathCWD('box.config.js'));

/**
 * @param {String} 路径
 * @returns {*} 操作后的路径
 */
function _join(filePath = '') {
    if (typeof filePath === 'string') {
        return path.join(process.cwd(), filePath);
    }
    if (typeof filePath === 'object') {
        Object.keys(filePath).forEach((key) => {
            filePath[key] = path.join(process.cwd(), filePath[key]);
        });
    }

    return filePath;
}

function aliasValue(alias) {
    for (let key in alias) {
        alias[key] = _join(alias[key]);
    }
    return alias;
}

// alias 默认值
const defaultAlias = {
    '@': 'src/',
};

module.exports = (options) => {
    const {
        devServer = {
            // 端口号
            port: 3000,
        },
        entry = '',
        dist = 'dist',
        publicPath = '/',
        libs = [],
        alias = defaultAlias,
        html = {},
        pages = false,
        style = {},
        dllCfg = {},
    } = userConfig;

    const { isEnvProd, isEnvDev } = options;
    return {
        base: {
            // devServer配置
            devServer,
            // 应用入口文件
            entry,
            // 公共地址，用于处理静态资源的引用问题，可以是相对路径或CDN等绝对地址
            publicPath,
            // 发布路径
            dist,
            // 第三方库分割，优先级按先后顺序
            libs,
            // alias
            alias: aliasValue(alias),
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
            // 外部扩展
            externals: {
                // jquery: 'jQuery'
            },
        },
        // html相关
        html: {
            // 生成html中默认的容器节点ID,默认值为root
            rootId: 'root',
            // 生成html中的标题
            title: 'webpack-cli',
            // favicon
            favicon: 'public/favicon.ico',
            // html模板文件的路径
            template: 'public/index.html',
            ...html,
        },
        // 多页
        pages,

        // dll打包相关
        dllCfg: {
            // dll动态链接库名称
            entry: 'vendors',
            output: 'dll',
            ...dllCfg,
        },

        // css 相关的处理
        style: {
            extract: style.extract || true, // 是否使用css分离插件 ExtractTextPlugin
            sourceMap: style.sourceMap || isEnvDev, // 开启 CSS source maps
            // 添加css-/postcss-/scss(sass)-/less-/stylus-loader的自定义options
            loaderOptions: {
                css: {}, // 这里的选项会传递给 css-loader
                less: Object.assign(
                    {
                        // 是否引入less-plugin-functions
                        lessFunction: false,
                        // common less file 公共less文件,不用引入即可使用
                        // 不需要时设置为false
                        lessCommon: false,
                    },
                    style.loaderOptions || {}
                ),
                sass: {},
                scss: {},
                stylus: {},
                postcss: {}, // 这里的选项会传递给 postcss-loader
            },
        },
        // ESModules
        ESModules: {
            open: userConfig.ESModules ? userConfig.ESModules : false,
        },
        // typescript options
        typescript: {
            open: userConfig.typescript ? userConfig.typescript : false,
        },

        // react options
        react: {
            open: userConfig.react ? userConfig.react : false,
        },

        // vue options
        vue: {
            // 是否使用vue
            open: userConfig.vue ? userConfig.vue : false,
        },

        // eslint options
        eslint: {
            ...userConfig.eslint,
        },
        // tslint options
        tslint: {
            ...userConfig.tslint,
        },
        // stylelint options
        stylelint: {
            ...userConfig.stylelint,
        },
        // webpack配置
        chainWebpack(config) {},
        configureWebpack(config) {},
    };
};
