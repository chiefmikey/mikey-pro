const durationValues = [
  String.raw`/\d*\.?\d+m?s\b/`,
  '/^(none|inherit|initial|unset|revert)$/i',
  '/var\\(/',
];

const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.cjs',
    '**/*.mjs',
    '**/*.ts',
    '**/*.json',
    '**/*.pi',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-strict-value',
  ],
  rules: {
    'color-function-notation': 'modern',
    'color-named': 'never',
    // Stylelint matches the name WITHOUT the leading `--`.
    'custom-property-pattern': '^[a-z0-9-]+$',
    'declaration-no-important': true,
    // Require an explicit time unit anywhere in the value (decimals and any
    // component order are fine); keywords and var() pass through.
    'declaration-property-value-allowed-list': {
      animation: durationValues,
      transition: durationValues,
    },
    'declaration-property-value-disallowed-list': {
      '/^grid/': ['auto'],
    },
    // Plugin rules are namespaced; the bare name is an "Unknown rule".
    'scale-unlimited/declaration-strict-value': [
      ['/color/', 'z-index'],
      {
        ignoreKeywords: ['transparent', 'inherit', 'currentColor'],
      },
    ],
    'function-calc-no-unspaced-operator': true,
    'max-nesting-depth': 3,
    'media-feature-name-no-vendor-prefix': true,
    'number-max-precision': 4,
    'order/properties-alphabetical-order': true,
    'property-no-vendor-prefix': true,
    'scss/at-extend-no-missing-placeholder': true,
    'scss/no-duplicate-mixins': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'selector-max-compound-selectors': 4,
    'selector-max-specificity': '0,4,2',
    'shorthand-property-no-redundant-values': true,
    'time-min-milliseconds': 100,
    'unit-disallowed-list': ['pt'],
    'value-no-vendor-prefix': true,
  },
};

export default config;
