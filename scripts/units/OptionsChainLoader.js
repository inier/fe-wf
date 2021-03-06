// [配置可选链loader，options-chain-loader] demo

module.exports = ({ config, resolve }) => {
    const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
    const normalRule = baseRule.oneOf('normal');
    return () => {
        normalRule.use('options-chain').loader(resolve('scripts/utils/options-chain-loader-polyfill'));
    };
};
