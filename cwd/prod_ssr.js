module.exports = function({ injectCommand }) {
    injectCommand(function({ program, boxConfig, cleanArgs, start, setEnv, isMultiPages }) {
        program
            .command('prod_ssr [pageName]')
            .description(`服务端渲染`)
            .option('-r, --report', '打包分析报告')
            .option('-m, --map', '开启SourceMap')
            .action(async (name, cmd) => {
                const options = cleanArgs(cmd);
                const args = Object.assign(options, { cmd: cmd._name, name }, boxConfig);

                start(args.cmd);
                if (args.dll) {
                    require('../scripts/dll')(args);
                }
                require('../scripts/ssr')(args);
            });
    });
};
