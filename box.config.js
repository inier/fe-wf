// 配置中心

module.exports = {
    // SPA项目的入口，多页面项目入口通过pages单独配置
    entry: 'src/index.js',
    // 出口
    dist: 'dist',
    // 公共地址，用于处理静态资源的引用问题，可以是相对路径或CDN等绝对地址
    publicPath: '/',
    env: {
        BASE_URL: '/',
        MY_ENV: 'my-env',
    },
    // 需要单独打包的三方库集合
    libs: {
        react: ['react', 'react-dom'],
        vue: ['vue'],
    },
    alias: {
        '@': 'src',
        '@src': 'src',
    },
    //dll打包相关
    dllCfg: {
        publicPath: '',
    },
    eslint: {
        lintOnSave: true, // 开启运行时检测
        extensions: ['js', 'jsx', 'vue'], // 默认 ['js', 'jsx']
    },
    tslint: {
        lintOnSave: true, // 开启运行时检测
        useThreads: true,
    },
    stylelint: {
        lintOnSave: true, // 开启运行时检测
        // extensions: ['vue', 'htm', 'html', 'css', 'sss', 'less', 'scss']
    },
    typescript: true,
    react: true,
    vue: true,
    pages: {
        index: {
            entry: 'src/index.js',
            title: 'js demo',
            template: 'public/index.html',
            filename: 'index.html',
        },
        indexTS: {
            entry: 'src/index.ts',
            title: 'ts demo',
            template: 'public/index.html',
            filename: 'index.html',
        },
        react: {
            type: 'react',
            entry: 'src/react.js',
            title: 'react demo',
            template: 'public/index.html',
            filename: 'index.html',
        },
        reactTS: {
            type: 'react',
            entry: 'src/react.tsx',
            title: 'react ts demo',
            template: 'public/index.html',
            filename: 'index.html',
        },
        vue: {
            type: 'vue',
            entry: 'src/vue.js',
            title: 'vue demo',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
};
