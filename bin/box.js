#!/usr/bin/env node
process.env.NODE_ENV = 'none';
const commandsName = ['prod', 'dev', 'dll', 'prod_ssr', 'ssr_server', 'lint', 'upgrade'];
const { injectCommand, commandComplete, commandName } = require('../api/CommandAPI');
const PluginAPI = require('../api/PluginAPI');

commandName.push(...commandsName);

// 注册命令行
commandsName.forEach((name) => {
    const cwd = require(`../cwd/${name}`);
    cwd({ cliName: name, injectCommand, api: PluginAPI });
});

// 命令行注册完成
commandComplete();
