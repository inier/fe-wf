// .commitlintrc.js

// https://www.npmjs.com/package/@commitlint/config-conventional
// https://github.com/ice-lab/spec
// const { commitlint } = require('@ice/spec');
// module.exports = commitlint;

module.exports = {
    extends: ['./node_modules/vue-cli-plugin-commitlint/lib/lint', '@commitlint/config-conventional'],
};
