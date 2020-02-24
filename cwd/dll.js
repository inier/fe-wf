module.exports = function({ injectCommand }) {
    injectCommand(function({ program, boxConfig, cleanArgs, start, execDll }) {
        program
            .command('dll [pageName]')
            .description(`编译差分包`)
            .option('-r, --report', '打包分析报告')
            // libType：框架类型，jQuery、react、vue等
            .action(async (libType, cmd) => {
                const options = cleanArgs(cmd);
                const args = Object.assign(
                    options,
                    {
                        cmd: cmd._name,
                        // libType：框架类型，jQuery、react、vue等
                        libType,
                        // lib：指定框架下需要抽离的公共库
                        lib: [],
                    },
                    boxConfig
                );

                start(args.cmd);

                execDll(args, () => {
                    require('../scripts/dll')(args);
                });
            });
    });
};
