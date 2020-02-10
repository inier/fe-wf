// 默认通用配置
const { PORT } = process.env;

module.exports = {
    server: {
        // 端口号
        port: PORT,
    },
    // 公共地址，用于处理静态资源的引用问题，可以是相对路径或CDN等绝对地址
    publicPath: '',
    // 关闭sourcemap：设为false或不设置该key；设置为true，默认为'cheap-source-map'
    sourcemap: false,
    path: {
        src: 'src',
        dist: 'dist',
        test: 'test',
        static: 'public',
    },
    dll: {
        entry: 'vendor',
        path: 'dll',
        vendors: ['vue', 'react'],
    },
};
