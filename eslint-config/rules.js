export const baseRules = {
  camelcase: [
    'error',
    {
      properties: 'never',
      ignoreDestructuring: true,
      ignoreImports: true,
      ignoreGlobals: true,
    },
  ],
  'class-methods-use-this': 'off',
  'constructor-super': 'warn',
  'dot-notation': 'warn',
  'func-names': 'off',
  'import/extensions': ['warn', 'ignorePackages', { ts: 'never' }],
  'import/no-commonjs': 'off',
  'import/default': 'off',
  'import/named': 'off',
  'import/namespace': 'off',
  'import/no-named-as-default-member': 'off',
  'import/no-unresolved': [
    'error',
    { amd: true, commonjs: true, ignore: ['^node:'] },
  ],
  'import/order': [
    'warn',
    {
      alphabetize: {
        order: 'asc',
      },
      'newlines-between': 'always',
    },
  ],
  'jsx-quotes': 'warn',
  'keyword-spacing': 'warn',
  'no-caller': 'warn',
  'no-confusing-arrow': 'warn',
  'no-console': 'off',
  'no-const-assign': 'warn',
  'no-delete-var': 'warn',
  'no-dupe-class-members': 'warn',
  'no-dupe-keys': 'warn',
  'no-duplicate-imports': 'warn',
  'no-else-return': 'warn',
  'no-empty': 'off',
  'no-empty-pattern': 'off',
  'no-extra-parens': 'off',
  'no-extra-bind': 'warn',
  'no-extra-semi': 'warn',
  'no-floating-decimal': 'warn',
  'no-iterator': 'warn',
  'no-lonely-if': 'warn',
  'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
  'no-multi-str': 'warn',
  'no-new-wrappers': 'warn',
  'no-process-exit': 'off',
  'no-proto': 'warn',
  'no-redeclare': 'warn',
  'no-restricted-syntax': [
    'warn',
    {
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      selector: 'ForInStatement',
    },
    {
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      selector: 'LabeledStatement',
    },
    {
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      selector: 'WithStatement',
    },
  ],
  'no-shadow': 'off',
  'no-shadow-restricted-names': 'warn',
  'no-spaced-func': 'warn',
  'no-this-before-super': 'warn',
  'no-undef-init': 'warn',
  'no-underscore-dangle': 'off',
  'no-unneeded-ternary': 'warn',
  'no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      ignoreRestSiblings: true,
    },
  ],
  'no-useless-call': 'warn',
  'no-useless-computed-key': 'warn',
  'no-useless-concat': 'warn',
  'no-useless-constructor': 'warn',
  'no-useless-escape': 'warn',
  'no-useless-rename': 'warn',
  'no-useless-return': 'warn',
  'no-var': 'warn',
  'no-with': 'warn',
  'object-curly-spacing': ['off', 'always'],
  'object-shorthand': 'warn',
  'prefer-arrow-callback': 'warn',
  'prefer-destructuring': [
    'warn',
    {
      array: false,
      object: true,
    },
  ],
  'prefer-rest-params': 'warn',
  'prefer-spread': 'warn',
  'prefer-template': 'warn',
  'prefer-const': 'warn',
  'quote-props': ['warn', 'as-needed'],
  quotes: [
    'off',
    'single',
    {
      allowTemplateLiterals: true,
      avoidEscape: true,
    },
  ],
  radix: 'warn',
  'filenames/match-regex': 'off',
  'require-atomic-updates': 'error',
  'sort-imports': 'off',
  'rest-spread-spacing': 'off',
  semi: 'off',
  'sort-vars': 'warn',
  'space-before-function-paren': [
    'off',
    { anonymous: 'always', asyncArrow: 'always', named: 'never' },
  ],
  'space-in-parens': ['off', 'never'],
  'spaced-comment': [
    'warn',
    'always',
    {
      block: {
        balanced: true,
        exceptions: ['*'],
        markers: ['!'],
      },
      line: {
        exceptions: ['-', '+'],
        markers: ['/'],
      },
    },
  ],
  strict: ['warn', 'never'],
  'unicode-bom': 'warn',
  'unicorn/filename-case': [
    'warn',
    {
      cases: {
        camelCase: true,
        pascalCase: true,
      },
      ignore: ['.*.md'],
    },
  ],
  'unicorn/prevent-abbreviations': [
    'warn',
    {
      allowList: {
        e2e: true,
        props: true,
        ref: true,
        params: true
      },
      ignore: [/e2e/]
    }
  ],
  'unicorn/import-index': 'warn',
  'prettier/prettier': ['warn', { parser: 'babel' }],

  // Error handling
  'no-await-in-loop': 'warn',
  'no-promise-executor-return': 'error',
  'no-unsafe-optional-chaining': 'error',

  // Modern practices
  'logical-assignment-operators': ['warn', 'always', { enforceForIfStatements: true }],
  'no-constant-binary-expression': 'error',
  'no-unused-private-class-members': 'warn',

  // Import rules
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import/no-empty-named-blocks': 'error',
  'import/no-reserved-dependencies': 'error',

  // Better promises
  'promise/no-multiple-resolved': 'error',
  'promise/prefer-await-to-callbacks': 'warn',

  // Security
  'security/detect-non-literal-fs-filename': 'warn',
  'security/detect-unsafe-regex': 'error',

  // Better testing
  'jest/prefer-spy-on': 'warn',
  'jest/require-top-level-describe': 'error',

  // Code Quality
  'sonarjs/cognitive-complexity': ['error', 15],
  'sonarjs/no-duplicate-string': ['error', 5],
  'sonarjs/no-redundant-boolean': 'error',
  'sonarjs/prefer-immediate-return': 'error',

  // RegExp
  'regexp/no-missing-g-flag': 'error',
  'regexp/no-useless-flag': 'error',
  'regexp/prefer-quantifier': 'error',

  // Enhanced TypeScript
  'etc/no-commented-out-code': 'warn',
  'etc/no-implicit-any-catch': 'error',
  'etc/prefer-interface': 'error',

  // Enhanced Import Rules
  'import/no-relative-parent-imports': 'warn',
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/test/**']
  }],

  // Better Promise Handling
  'promise/no-nesting': 'warn',
  'promise/prefer-await-to-then': 'warn',

  // Security Enhancements
  'security/detect-buffer-noassert': 'error',
  'security/detect-child-process': 'warn',
  'security/detect-disable-mustache-escape': 'error',

  // Code Organization
  'typescript-sort-keys/interface': 'warn',
  'typescript-sort-keys/string-enum': 'warn',
  'sort-destructure-keys/sort-destructure-keys': 'warn',

  // Code Quality
  'write-good-comments/write-good-comments': 'warn',
  'sonarjs/no-small-switch': 'warn',
  'sonarjs/no-duplicated-branches': 'error',
  'sonarjs/max-switch-cases': ['warn', 10],

  // Additional Security
  'security/detect-possible-timing-attacks': ['error', { threshold: 10 }],
  'security/detect-non-literal-regexp': ['error', { report: 'error' }],
  'security/detect-non-literal-require': 'error',

  // Better Type Safety
  'import/no-relative-packages': 'error',
  'import/no-self-import': 'error',

  // Architecture Boundaries
  'boundaries/element-types': [
    'warn',
    {
      default: 'disallow',
      rules: [
        { from: 'utils', allow: ['utils'] },
        { from: 'features', allow: ['features', 'shared', 'utils'] },
        { from: 'shared', allow: ['shared', 'utils'] }
      ]
    }
  ],

  // Performance
  'optimize-regex/optimize-regex': 'warn',
  'radar/no-duplicate-string': ['warn', 5],
  'radar/cognitive-complexity': ['error', 15],

  // Enhanced Security
  'security/detect-non-literal-fs-filename': ['error', { allowInlineConfig: false }],
  'security/detect-unsafe-regex': ['error', { allowDollarMatchAll: false }],
  'security/detect-buffer-noassert': 'error',

  // Better Type Safety
  'import/no-cycle': ['error', { maxDepth: 1 }],
  'import/no-relative-packages': 'error',
  'unicorn/prefer-module': 'error',

  // Code Style
  'perfectionist/sort-named-imports': [
    'warn',
    {
      type: 'natural',
      order: 'asc',
      'ignore-case': true
    }
  ],

  // Enhanced Security
  'security/detect-possible-timing-attacks': ['error', {
    threshold: 8,
    catchAliases: true
  }],
  'security/detect-non-literal-regexp': ['error', {
    report: 'error',
    warnOnDynamicRegexp: true
  }],
  'security/detect-unsafe-regex': ['error', {
    maxLength: 50
  }],

  // Import Safety
  'import/no-import-module-exports': 'error',
  'import/no-relative-parent-imports': ['error', {
    ignore: ['@/components', '@/utils', '@/types']
  }],

  // Better Code Organization
  'perfectionist/sort-objects': ['error', {
    type: 'natural',
    order: 'asc',
    'spread-last': true
  }],
  'perfectionist/sort-named-imports': ['error', {
    type: 'natural',
    order: 'asc',
    'ignore-case': true
  }],

  // Advanced Performance
  'no-restricted-syntax': [
    'error',
    {
      selector: "CallExpression[callee.property.name='reduce'][arguments.length<2]",
      message: 'Provide initialValue to reduce'
    },
    {
      selector: "CallExpression[callee.property.name='forEach']",
      message: 'Use for...of instead'
    }
  ],
  'require-atomic-updates': ['error', { allowProperties: false }],
  'no-constant-binary-expression': 'error',

  // Better Error Handling
  'no-implicit-coercion': ['error', { boolean: false, number: true, string: true }],
  'unicorn/prefer-type-error': 'error',
  'unicorn/no-useless-undefined': ['error', { checkArguments: true }],

  // Enhanced Import Safety
  'import/no-cycle': ['error', { maxDepth: 1, ignoreExternal: true }],
  'import/no-relative-packages': 'error',
  'import/no-self-import': 'error',

  // Type Safety
  'unicorn/prefer-at': 'error',
  'unicorn/prefer-string-replace-all': 'error',
  'unicorn/require-post-message-target-origin': 'error',

  // Security
  'n/no-unsupported-features/es-syntax': ['error', {
    version: '>=18.0.0',
    ignores: ['modules', 'dynamicImport']
  }],

  // Modern JavaScript Features
  'prefer-object-has-own': 'error',
  'unicorn/prefer-string-slice': 'error',
  'unicorn/prefer-array-flat': ['error', { functions: ['flatten'] }],
  'unicorn/prefer-blob-reading-methods': 'error',

  // Memory Optimizations
  'no-array-constructor': 'error',
  'no-new-object': 'error',
  'prefer-exponentiation-operator': 'error',

  // Better Error Handling
  'max-classes-per-file': ['error', 1],
  'no-promise-executor-return': ['error', { allowVoid: true }],
  'unicorn/catch-error-name': ['error', { name: 'error' }],

  // Enhanced Import Safety
  'import/no-namespace': 'error',
  'import/no-empty-named-blocks': 'error',
  'import/no-duplicates': ['error', { 'prefer-inline': true }]
};
