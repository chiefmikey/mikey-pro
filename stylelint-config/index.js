module.exports = {
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
  rules: {
    'custom-property-pattern': '^--[a-zA-Z0-9-]+[a-zA-Z0-9-]+$',
  },
};
