import type { Options as PugOptions } from 'pug';

import pug from 'pug';

/**
 * Options for Pug compiler
 */
export interface PugCompilerOptions extends PugOptions {
	/**
	 * Base directory for resolving includes
	 */
	readonly basedir?: string;
	/**
	 * Document type
	 * @default 'html'
	 */
	readonly doctype?: string;
	/**
	 * Whether to pretty-print HTML
	 * @default true
	 */
	readonly pretty?: boolean;
}

/**
 * Compiles a Pug template to HTML
 * @param template - Pug template string
 * @param data - Data object to pass to the template
 * @param options - Pug compiler options
 * @returns Compiled HTML string
 * @throws {Error} if compilation fails
 * @example
 * ```typescript
 * const html = await compilePug('p Hello, world!', { title: 'My Page' }, {
 *   basedir: './src',
 *   doctype: 'html',
 *   pretty: true,
 * });
 * ```
 */
export function compilePug(
	template: string,
	data: Record<string, unknown>,
	options: PugCompilerOptions = {},
): Promise<string> {
	const pugOptions: PugOptions = {
		basedir: options.basedir,
		doctype: options.doctype ?? 'html',
		pretty: options.pretty ?? true,
		...options,
	};

	try {
		const compiler = pug.compile(template, pugOptions);
		return Promise.resolve(compiler(data));
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to compile Pug template: ${error instanceof Error ? error.message : String(error)}`,
				{
					cause: error,
				},
			),
		);
	}
}
