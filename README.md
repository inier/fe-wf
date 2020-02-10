# fe-wf

fe-wf

## 环境准备

-   node v10+, 个人 v12+
-   webpack 4+
-   webpack-cli 3.3.10
-   npm@6.13.7+ 或 yarn@1.22.0+

## 特性

-   使用 webpack-chain 配置
-   插件可插拔配置,检测命令行是否带有指定标记
    -   --report 开启打包分析报告
    -   --gzip 开启 gzip 打包
    -   --dll 开启 dll 打包
-   支持 Code Splitting（代码分割）
-   支持 Bundle Splitting（打包分割）
-   支持 Tree Shaking（删除死代码）
-   支持动态加载模块 import()
-   使用 babel 解析 js，ts
-   使用 postcss 处理 css，支持 autoprefixer
-   支持 less、sass、postcss（pcss）文件的预处理

## 命令行

-   yarn start    开发
-   yarn debug    调试打包
-   yarn prod     生产打包
-   yarn dll      构建dll
-   yarn test     测试  
-   yarn log      生成changelog
-   yarn cz       自定义提交
