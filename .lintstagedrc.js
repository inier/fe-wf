// .lintstagedrc.js

// https://github.com/okonet/lint-staged

module.exports = {
    '*.{vue,htm,html,css,sss,less,scss}': ['prettier --write', 'lint stylelint', 'git add'],
    '*.{js,jsx}': ['prettier --write', 'box lint eslint', 'git add'],
    'src/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'box lint eslint', 'git add'],
};
