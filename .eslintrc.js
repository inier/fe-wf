module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: ['plugin:vue/essential', 'standard'],
    rules: {
        indent: [2, 4],
        semi: 0,
        'no-new': 0,
        'max-len': 0,
        'no-unused-vars': 0,
        'space-before-function-paren': 0,
        'eslint-disable-next-line': 0,
        'no-useless-escape': 0,
        'one-var': 0,
    },
    globals: {
        wx: true,
        window: true,
        document: true,
    },
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
};
