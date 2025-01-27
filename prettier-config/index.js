const config = {
  // Core formatting
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false, // new name for jsxBracketSameLine
  arrowParens: 'always',
  proseWrap: 'always',

  // Enhanced whitespace handling
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: true,

  // Framework-specific
  vueIndentScriptAndStyle: false,

  // Svelte
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: true,
  svelteBracketNewLine: true,
  svelteAllowShorthand: false,
  svelteIndentScriptAndStyle: false,

  // Overrides for specific file types
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
};

export default config;

// Support CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
