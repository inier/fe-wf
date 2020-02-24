module.exports = function({ injectCommand }) {
    injectCommand(function({ program, boxConfig, cleanArgs, start, setEnv, isMultiPages, execDll }) {
        program
            .command('prod_ssr [pageName]')
            .description(`服务端渲染`)
            .option('-r, --report', '打包分析报告')
            .option('-m, --map', '开启SourceMap')
            .action(async (name, cmd) => {
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
                require('../scripts/ssr')(args);
            });
    });
};
