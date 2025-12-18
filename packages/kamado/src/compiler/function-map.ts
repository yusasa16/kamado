import type { CompileFunction } from './index.js';
import type { Config } from '../config/types.js';

/**
 * Creates a map of output extensions to compile functions
 * @param config - Configuration object
 * @returns Map of output extension to compile function
 */
export async function createCompileFunctionMap(config: Config) {
	const compilers = new Map<string, CompileFunction>();
	for (const compilerWithMetadata of config.compilers) {
		const compileFunction = await compilerWithMetadata.compiler(config);
		compilers.set(compilerWithMetadata.outputExtension, compileFunction);
	}
	return compilers;
}
