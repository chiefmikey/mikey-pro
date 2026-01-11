// Prettier configuration for Mikey Pro
export default {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
  ],
  printWidth: 80,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  svelteAllowShorthand: false,
  svelteBracketNewLine: true,
  svelteIndentScriptAndStyle: false,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
};
