module.exports = function({ injectCommand }) {
    injectCommand(function({ program, boxConfig, cleanArgs, start, setEnv, isMultiPages, execDll }) {
        program
            .command('ssr_server [pageName]')
            .description(`服务端渲染 server 端运行`)
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
                require('../scripts/ssr-server')(args);
            });
    });
};
