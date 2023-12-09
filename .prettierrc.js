/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSameLine: true,
	printWidth: 80,
	plugins: ['prettier-plugin-svelte'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
