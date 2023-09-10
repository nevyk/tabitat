/** @type {import("prettier").Config} */
export default {
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  printWidth: 100,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
