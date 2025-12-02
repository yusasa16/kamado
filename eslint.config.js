import dz from '@d-zero/eslint-config';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
	...dz.configs.node,
	{
		files: ['**/{*.{config,spec}.{js,mjs,ts},*.*rc,*.*rc.{js,mjs}}'],
		rules: {
			'import-x/no-extraneous-dependencies': 0,
		},
	},
	{
		files: ['.textlintrc.js'],
		rules: {
			'no-undef': 0,
			'@typescript-eslint/no-require-imports': 0,
		},
	},
];
