import path from 'node:path';

/**
 * File path information for output
 */
export interface OutputPathInfo {
	/**
	 * Output file path (absolute path)
	 */
	readonly outputPath: string;
	/**
	 * File name without extension
	 */
	readonly name: string;
	/**
	 * File extension (lowercase, includes dot)
	 */
	readonly extension: string;
	/**
	 * Relative directory from input directory
	 */
	readonly relDir: string;
	/**
	 * Root relative path without extension
	 */
	readonly rootRelPath: string;
	/**
	 * Root relative path with output extension
	 */
	readonly rootRelPathWithExt: string;
}

/**
 * Computes output file path and related information from input file path
 * @param inputPath - Input file path
 * @param inputDir - Input directory path
 * @param outputDir - Output directory path
 * @param outputExtension - Output file extension (e.g., '.html', '.css', '.js')
 * @returns Output path information object
 * @example
 * ```typescript
 * const info = computeOutputPath(
 *   './src/pages/index.pug',
 *   './src',
 *   './dist',
 *   '.html'
 * );
 * // Returns: {
 * //   outputPath: '/absolute/path/to/dist/pages/index.html',
 * //   name: 'index',
 * //   extension: '.pug',
 * //   relDir: 'pages',
 * //   rootRelPath: 'pages/index',
 * //   rootRelPathWithExt: 'pages/index.html'
 * // }
 * ```
 */
export function computeOutputPath(
	inputPath: string,
	inputDir: string,
	outputDir: string,
	outputExtension: string,
): OutputPathInfo {
	const originalExtension = path.extname(inputPath);
	const extension = originalExtension.toLowerCase();
	const name = path.basename(inputPath, originalExtension);
	const dir = path.dirname(inputPath);
	const relDir = path.relative(inputDir, dir);
	const rootRelPath = path.join(relDir, name);
	const rootRelPathWithExt = `${rootRelPath}${outputExtension}`;
	const outputPath = path.resolve(outputDir, rootRelPathWithExt);

	return {
		outputPath,
		name,
		extension,
		relDir,
		rootRelPath,
		rootRelPathWithExt,
	};
}
