module.exports = function({ injectCommand }) {
    injectCommand(function({ program, boxConfig, cleanArgs, start, setEnv, isMultiPages, execCmd, execDll }) {
        program
            .command('prod [pageName]')
            .description(`生产环境构建`)
            .option('-r, --report', '打包分析报告')
            .option('-g, --gzip', '开启Gzip')
            .option('-m, --map', '开启SourceMap')
            .option('-u, --debug', '开启移动端调试')
            .option('-d, --dll', '合并dll差分包')
            .option('-s, --sep', '合并dll差分包时，多页面分开部署')
            .option('-p, --spa', '多页面开发中采用SPA单页打包,代码会输出到根目录(默认会生成name命名的目录)')
            .action(async (name, cmd) => {
                setEnv('production');

                const options = cleanArgs(cmd);
                const args = Object.assign(
                    options,
                    {
                        cmd: cmd._name,
                        name,
                        // libType：框架类型，jQuery、react、vue等
                        libType: undefined,
                        // lib：指定框架下需要抽离的公共库
                        lib: [],
                        isMultiPages: isMultiPages(name, boxConfig, options),
                    },
                    boxConfig
                );

                start(args.cmd);
                if (args.dll) {
                    execDll(args, () => {
                        require('../scripts/dll')(args);
                    });
                    Object.assign(args, {
                        // libType：框架类型，jQuery、react、vue等
                        libType: undefined,
                        // lib：指定框架下需要抽离的公共库
                        lib: [],
                    });
                }
                execCmd(args, () => {
                    require('../scripts/prod')(args);
                });
            });
    });
};
