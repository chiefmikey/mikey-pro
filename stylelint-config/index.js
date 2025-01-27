const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-strict-value'
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.cjs',
    '**/*.mjs',
    '**/*.ts',
    '**/*.json',
    '**/*.pi',
  ],
  rules: {
    // Custom property naming
    'custom-property-pattern': '^--[a-z0-9-]+$',
    'selector-class-pattern': '^[a-z][a-zA-Z0-9-]*$',

    // Modern CSS practices
    'declaration-no-important': true,
    'shorthand-property-no-redundant-values': true,
    'number-max-precision': 4,
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,

    // SCSS specific rules
    'scss/at-extend-no-missing-placeholder': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-duplicate-mixins': true,

    // Unit and calculation consistency
    'unit-disallowed-list': ['pt'],
    'function-calc-no-unspaced-operator': true,

    // Media query handling
    'media-feature-name-no-vendor-prefix': true,
    'media-query-list-comma-newline-after': 'always-multi-line',

    // Modern layout rules
    'declaration-property-value-disallowed-list': {
      'position': ['fixed'],
      '/^grid/': ['auto'],
    },

    // Color handling
    'color-function-notation': 'modern',
    'color-named': 'never',

    // Z-index handling
    'declaration-strict-value': [
      ['/color/', 'z-index'],
      {
        ignoreKeywords: ['transparent', 'inherit', 'currentColor']
      }
    ],

    // Specificity and maintainability
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 4,
    'selector-max-specificity': '0,4,2',

    // Animations and transitions
    'time-min-milliseconds': 100,
    'declaration-property-value-allowed-list': {
      'transition': ['/^\\d+ms/', '/^\\d+s/'],
      'animation': ['/^\\d+ms/', '/^\\d+s/']
    },

    // Add order rules
    'order/properties-alphabetical-order': true,
  }
};

export default config;

// Support CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
