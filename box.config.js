// 配置中心

module.exports = {
    // SPA项目的入口，多页面项目入口通过pages单独配置
    entry: 'src/index.js',
    // 出口
    dist: 'dist',
    // 公共地址，用于处理静态资源的引用问题，可以是相对路径或CDN等绝对地址
    publicPath: '/',
    // 需要单独打包的三方库集合
    libs: ['react', 'react-dom', 'vue'],
    pages: {
        index: {
            entry: 'src/index.js',
            title: 'init page 1',
            template: 'public/index.html',
            filename: 'index.html',
        },
        index2: {
            entry: 'src/index2.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
        react: {
            entry: 'src/react.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
        reactTS: {
            entry: 'src/react.tsx',
            template: 'public/index.html',
            filename: 'index.html',
        },
        vue: {
            entry: 'src/vue.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
    typescript: true,
    react: true,
    vue: true,
};
