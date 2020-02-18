// [打包前先删除之前的dist目录]
// https://github.com/johnagan/clean-webpack-plugin

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({ config }) => {
    return () => {
        config.plugin('CleanWebpackPlugin').use(CleanWebpackPlugin);
    };
};
