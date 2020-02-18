// [移动端进行调试]
// https://github.com/diamont1001/vconsole-webpack-plugin

const vConsolePlugin = require('vconsole-webpack-plugin');

module.exports = ({ config, options }) => {
    return () => {
        config.plugin('vConsolePlugin').use(vConsolePlugin, [
            {
                enable: !!options.debug,
            },
        ]);
    };
};
