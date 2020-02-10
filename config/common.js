// 默认通用配置
const { PORT } = process.env;

module.exports = {
    server: {
        // 端口号
        port: PORT,
    },
    // 公共地址，用于处理静态资源的引用问题，可以是相对路径或CDN等绝对地址
    publicPath: '',
    path: {
        src: 'src',
        dist: 'dist',
        test: 'test',
        static: 'public',
    },
    dll: {
        // dll动态链接库名称
        entry: 'vendor',
        path: 'dll',
        // 需要抽取dll的库集合
        vendors: ['vue', 'react'],
    },
};
