module.exports = function(injectCommand) {
    injectCommand(function({ program, boxConfig, cleanArgs, start, setEnv, isMultiPages }) {
        program
            .command('ssr_server [pageName]')
            .description(`服务端渲染 server 端运行`)
            .action(async (name, cmd) => {
                const options = cleanArgs(cmd);
                const args = Object.assign(options, { cmd: cmd._name, name }, boxConfig);

                start(args.cmd);
                if (args.dll) {
                    require('../scripts/dll')(args);
                }
                require('../scripts/ssr-server')(args);
            });
    });
};
