module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    globals: {
        React: true,
        ReactDOM: true,
        mountNode: true,
        document: true,
        i18n: true,
        navigator: true,
        node: true,
        require: false,
        window: true,
        $: true,
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            legacyDecorators: true,
            jsx: true,
        },
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'prettier', 'prettier/react', 'standard'],
    // eslint eslint-plugin-prettier来识别prettier.config.js配置来集成规则
    plugins: ['prettier'],
    // 启用的规则及各自的错误级别
    rules: {
        // prettier规则检查：警告
        'prettier/prettier': 'warn',

        'vue/script-indent': ['error', 4, { baseIndent: 1 }],
        /** import/export相关 https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules */
        // 必须写明文件类型：取消
        'import/extensions': 'off',
        // 路径必须可以被本地文件系统解析：取消
        'import/no-unresolved': 'off',
        // 只能引用package.json声明的依赖：取消 TBD
        'import/no-extraneous-dependencies': 'off',
        // 优先使用 export default: 取消
        'import/prefer-default-export': 'off',
        // 禁止重复imports
        'no-duplicate-imports': 'error',

        /** 基础语法规则 https://eslint.org/docs/rules/ */
        // 箭头函数必须使用大括号：取消
        'arrow-body-style': 'off',
        // 代码块{}的括号样式，起始大括号跟随语句末尾：警告
        'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
        // 驼峰命名方式：警告
        camelcase: 'warn',
        // 减少绑定上下文之外的变量的使用
        'block-scoped-var': 'error',
        // 旨在标记不使用的类方法this：取消
        'class-methods-use-this': 'off',
        // 限制程序的圈复杂度
        complexity: ['warn', 20],
        // 函数必须有返回值：取消
        'consistent-return': 'off',
        // 尽可能使用点符号样式，维护代码一致性和可读性：警告
        'dot-notation': 'warn',
        // 禁止匿名函数：取消
        'func-names': 'off',
        // 旨在防止使用for in循环而不过滤循环中的结果时可能出现的意外行为：警告
        'guard-for-in': 'warn',
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 禁止在同一范围内重复声明同一变量
        'no-redeclare': ['error', { builtinGlobals: false }],
        // 换行符\n或\r\n的验证：取消
        'linebreak-style': 'off',
        // 强制一行的最大长度：取消，使SVG不用重新调整格式
        'max-len': 'off',
        // 强制执行嵌套块的最大深度：6
        'max-depth': ['error', 6],
        // 指定函数定义中允许的最大参数个数：5
        'max-params': ['warn', 5],
        // 指定函数中允许的最大语句数：50
        'max-statements': ['error', 50],
        // 要求构造函数名以大写字母开头
        'new-cap': 'error',
        // 禁止使用 var
        'no-var': 'error',
        // 禁用__proto__属性
        'no-proto': 'error',
        // 检查循环条件内引用的变量是否在循环中被修改
        'no-unmodified-loop-condition': 'error',
        // 禁止 console：取消
        'no-console': 'off',
        // 禁止变量声明与外层作用域的变量同名：取消
        'no-shadow': 'off',
        // 禁止未使用过的表达式：取消，以此来支持a && a()的代码形式
        'no-unused-expressions': 'off',
        // 禁止变量定义前使用：警告, 函数除外
        'no-use-before-define': ['warn', { functions: false }],
        // 禁止直接调用 Object.prototypes 的内置属性：警告
        'no-prototype-builtins': 'warn',
        // 禁止对函数参数进行重新赋值：警告
        'no-param-reassign': 'warn',
        // 禁用特定的全局变量：取消
        // 'no-restricted-globals': 'off',
        // 禁止 if 语句中 return 语句之后有 else 块：取消
        'no-else-return': 'off',
        // 禁止在 return 语句中使用赋值语句：取消  ref={formRef => form = formRef}
        'no-return-assign': 'off',
        // 禁止在return语句中使用await：取消
        'no-return-await': 'off',
        // 禁止 ++ --: 取消， for循环中使用例外
        'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],
        // 禁止await在循环体内使用：警告
        'no-await-in-loop': 'warn',
        // 禁止按位运算符：警告
        'no-bitwise': 'warn',
        // 禁止在可能与比较运算符混淆的地方使用箭头函数语法
        'no-confusing-arrow': 'error',
        // 禁止模糊等于null
        'no-eq-null': 'error',
        // 消除浮动小数点值的误解：警告
        'no-floating-decimal': 'warn',
        // 禁止将if语句作为else块中的唯一语句：警告
        'no-lonely-if': 'warn',
        // 对象声明是否换行：取消
        'object-curly-newline': 'off',
        // 优先使用解构：取消
        'prefer-destructuring': 'off',
        // 优先使用箭头函数作为回调函数或函数参数的函数表达式：警告
        'prefer-arrow-callback': 'warn',
        // 优先模板字符串
        'prefer-template': 'error',
        // 警告不具有await表达式的异步函数
        'require-await': 'error',
        // 强制执行有效且一致的JSDoc注释：警告
        'valid-jsdoc': [
            'warn',
            {
                requireReturn: false,
                requireReturnDescription: false,
                requireReturnType: false,
            },
        ],

        /**
         * react相关 https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
         * 下列被注释的规则表示已经在 eslint-config-react-app 中定义
         */
        // 布尔值类型的 propTypes 的 name 必须为 is 或 has 开头
        // @off 不强制要求写 propTypes
        'react/boolean-prop-naming': 'off',
        // 一个 defaultProps 必须有对应的 propTypes
        // @off 不强制要求写 propTypes
        'react/default-props-match-prop-types': 'off',
        // 使用 props/state/context 必须解构：取消
        'react/destructuring-assignment': 'off',
        // 组件必须有 displayName 属性
        // @off 不强制要求写 displayName
        'react/display-name': 'off',
        // 禁止在自定义组件中使用一些指定的 props
        // @off 没必要限制
        'react/forbid-component-props': 'off',
        // 禁止使用一些指定的 elements
        // @off 没必要限制
        'react/forbid-elements': 'off',
        // 禁止使用一些指定的 propTypes
        // @off 不强制要求写 propTypes
        'react/forbid-prop-types': 'off',
        // 禁止直接使用别的组建的 propTypes
        // @off 不强制要求写 propTypes
        // 'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
        // 禁止使用数组的 index 作为 key
        // @off 太严格了
        'react/no-array-index-key': 'off',
        // 禁止使用 children 做 props
        'react/no-children-prop': 'error',
        // 禁止使用 dangerouslySetInnerHTML
        // @off 没必要限制
        'react/no-danger': 'off',
        // 禁止在使用了 dangerouslySetInnerHTML 的组建内添加 children
        'react/no-danger-with-children': 'warn',
        // 禁止使用已废弃的 api
        'react/no-deprecated': 'error',
        // 禁止在 componentDidMount 里面使用 setState
        // @off 同构应用需要在 didMount 里写 setState
        'react/no-did-mount-set-state': 'off',
        // 禁止在 componentDidUpdate 里面使用 setState
        'react/no-did-update-set-state': 'error',
        // 禁止直接修改 this.state
        'react/no-direct-mutation-state': 'error',
        // 禁止使用 findDOMNode
        'react/no-find-dom-node': 'error',
        // 禁止使用 isMounted
        // 'react/no-is-mounted': 'error',
        // 禁止在一个文件创建两个组件
        // @off 有一个 bug https://github.com/yannickcr/eslint-plugin-react/issues/1181
        'react/no-multi-comp': [
            'warn',
            {
                ignoreStateless: true,
            },
        ],
        // 禁止在 PureComponent 中使用 shouldComponentUpdate
        'react/no-redundant-should-component-update': 'error',
        // 禁止使用 ReactDOM.render 的返回值：警告
        'react/no-render-return-value': 'warn',
        // 禁止使用 setState
        // @off setState 很常用
        'react/no-set-state': 'off',
        // 禁止拼写错误
        // 'react/no-typos': 'error',
        // 禁止使用字符串 ref
        'react/no-string-refs': 'error',
        // 禁止在组件的内部存在未转义的 >, ", ' 或 }
        'react/no-unescaped-entities': 'error',
        // @fixable 禁止出现 HTML 中的属性，如 class
        'react/no-unknown-property': 'error',
        // 禁止出现未使用的 propTypes
        // @off 不强制要求写 propTypes
        'react/no-unused-prop-types': 'off',
        // 定义过的 state 必须使用
        // @off 没有官方文档，并且存在很多 bug： https://github.com/yannickcr/eslint-plugin-react/search?q=no-unused-state&type=Issues&utf8=%E2%9C%93
        'react/no-unused-state': 'off',
        // 禁止在 componentWillUpdate 中使用 setState
        'react/no-will-update-set-state': 'error',
        // 优先使用 Class 的形式创建组件
        'react/prefer-es6-class': 'off',
        // 优先使用 pure function
        // @off 没必要限制
        'react/prefer-stateless-function': 'off',
        // 组件必须写 propTypes
        // @off 不强制要求写 propTypes
        'react/prop-types': 'off',
        // 出现 jsx 的地方必须 import React
        // @off 已经在 no-undef 中限制了
        // 'react/react-in-jsx-scope': 'off',
        // 非 required 的 prop 必须有 defaultProps
        // @off 不强制要求写 propTypes
        'react/require-default-props': 'off',
        // 组件必须有 shouldComponentUpdate
        // @off 没必要限制
        'react/require-optimization': 'off',
        // render 方法中必须有返回值
        // 'react/require-render-return': 'error',
        // @fixable 组件内没有 children 时，必须使用自闭和写法
        'react/self-closing-comp': 'warn',
        // @fixable 组件内方法必须按照一定规则排序：警告
        'react/sort-comp': 'warn',
        // propTypes 的熟悉必须按照字母排序
        // @off 没必要限制
        'react/sort-prop-types': 'off',
        // style 属性的取值必须是 object
        'react/style-prop-object': 'error',
        // HTML 中的自闭和标签禁止有 children
        'react/void-dom-elements-no-children': 'error',
        // @fixable 布尔值的属性必须显式的写 someprop={true}
        // @off 没必要限制
        'react/jsx-boolean-value': 'off',
        // @fixable 自闭和标签的反尖括号必须与尖括号的那一行对齐
        'react/jsx-closing-bracket-location': [
            'warn',
            {
                nonEmpty: false,
                selfClosing: 'line-aligned',
            },
        ],
        // @fixable 结束标签必须与开始标签的那一行对齐
        // @off 已经在 jsx-indent 中限制了
        'react/jsx-closing-tag-location': 'off',
        // @fixable 大括号内前后禁止有空格
        'react/jsx-curly-spacing': [
            'warn',
            {
                when: 'never',
                attributes: {
                    allowMultiline: true,
                },
                children: true,
                spacing: {
                    objectLiterals: 'never',
                },
            },
        ],
        // @fixable props 与 value 之间的等号前后禁止有空格
        'react/jsx-equals-spacing': ['error', 'never'],
        // 限制文件后缀
        // @off 没必要限制
        'react/jsx-filename-extension': 'off',
        // @fixable 第一个 prop 必须得换行
        // @off 没必要限制
        'react/jsx-first-prop-new-line': 'off',
        // handler 的名称必须是 onXXX 或 handleXXX
        // @off 没必要限制
        'react/jsx-handler-names': 'off',
        // @fixable 限制每行的 props 数量
        // @off 没必要限制
        'react/jsx-max-props-per-line': 'off',
        // jsx 中禁止使用 bind
        // @off 太严格了
        'react/jsx-no-bind': 'off',
        // 禁止在 jsx 中使用像注释的字符串
        // 'react/jsx-no-comment-textnodes': 'warn',
        // 禁止出现重复的 props
        // 'react/jsx-no-duplicate-props': 'error',
        // 禁止在 jsx 中出现字符串
        // @off 没必要限制
        'react/jsx-no-literals': 'off',
        // 禁止使用 target="_blank"
        // 'react/jsx-no-target-blank': 'warn',
        // 禁止使用 pascal 写法的 jsx，比如 <TEST_COMPONENT>
        // 'react/jsx-pascal-case': 'error',
        // @fixable props 必须排好序
        // @off 没必要限制
        'react/jsx-sort-props': 'off',
        // @fixable jsx 的开始和闭合处禁止有空格
        'react/jsx-tag-spacing': [
            'warn',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
            },
        ],
        // jsx 文件必须 import React
        // 'react/jsx-uses-react': 'error',
        // 定义了的 jsx element 必须使用
        // 'react/jsx-uses-vars': 'warn',
        // @fixable 多行的 jsx 必须有括号包起来
        'react/jsx-wrap-multilines': 'warn',
        // 每行只能有一个jsx组件声明： 取消
        'react/jsx-one-expression-per-line': 'off',

        /** React Hooks Style Guide，由eslint-config-react-app控制 https://reactjs.org/docs/hooks-rules.html */
        // 检查 Hook 的规则
        // 'react-hooks/rules-of-hooks': 'error',
        // 检查 effect 的依赖
        // 'react-hooks/exhaustive-deps': 'warn',

        /** 无障碍相关 https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules */
        // label htmlFor 属性或者用 label 把表单组件包起来：警告
        'jsx-a11y/label-has-associated-control': 'warn',
        // 静态元素（div/span/...）不允许绑定事件，除非指定 role：取消
        'jsx-a11y/no-static-element-interactions': 'off',
        // 静态元素（div/span/...）不允许绑定事件，除非指定 role：取消
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        // 支持 click 事件必须同时支持键盘事件：取消
        'jsx-a11y/click-events-have-key-events': 'off',
        // 禁止不规则使用 a 标签：取消
        // 'jsx-a11y/anchor-is-valid': 'off',

        /** 国际化相关 */
        'i18n/no-chinese-character': 'off',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
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
}
