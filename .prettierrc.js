// .prettierrc.js

// https://prettier.io/docs/en/options.html#trailing-commas

module.exports = {
    endOfLine: 'lf', // 使用Linux 的行尾风格
    printWidth: 120, // 换行字符串阈值
    tabWidth: 4, // 缩进
    trailingComma: 'es5', // 最后一个对象元素加逗号的规则
    singleQuote: true, // 用单引号
    jsxBracketSameLine: false, // jsx > 是否另起一行
    bracketSpacing: true, // 对象，数组加空格
    arrowParens: 'always', // (x) => {} 是否要有小括号
    proseWrap: 'preserve', // 是否要换行
    requirePragma: false, // 是否要注释来决定是否格式化代码
};
