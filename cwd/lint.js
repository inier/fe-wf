module.exports = function(injectCommand, api) {
    injectCommand(function({ program, boxConfig, start, cleanArgs }) {
        program
            .command('lint [type]')
            .description('修复lint')
            .action(async (name, cmd) => {
                const options = cleanArgs(cmd);
                const args = Object.assign(options, { cmd: cmd._name, name }, boxConfig);

                start(args.cmd);
                require('../scripts/lint')(args, api);
            });
    });
};
