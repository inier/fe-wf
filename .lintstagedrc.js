// .lintstagedrc.js

// https://github.com/okonet/lint-staged

module.exports = {
  'src/**/*.{js,jsx}': ['prettier --write', 'box lint eslint', 'git add'],
  'src/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'eslint --format table --fix', 'git add'],
  'src/**/*.{css}': ['prettier --write', 'stylelint --fix', 'git add'],
  'src/*.{less}': ['prettier --write', 'stylelint --syntax less --fix', 'git add'],
  'src/*.{sass,scss}': ['prettier --write', 'stylelint --syntax scss --fix', 'git add'],
  'src/**/*.{json,md}': ['prettier', 'git add']
}
