module.exports = function(injectCommand) {
    injectCommand(function({ program, boxConfig, cleanArgs, start }) {
        program
            .command('dll [pageName]')
            .description(`编译差分包`)
            .option('-r, --report', '打包分析报告')
            .action(async (name, cmd) => {
                const options = cleanArgs(cmd);
                const args = Object.assign(options, { cmd: cmd._name, name }, boxConfig);

                start(args.cmd);
                require('../scripts/dll')(args);
            });
    });
};
