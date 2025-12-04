import path from 'node:path';

import { describe, test, expect } from 'vitest';

import { computeOutputPath } from './output-path.js';

describe('computeOutputPath', () => {
	test('case 01: basic path conversion', () => {
		const info = computeOutputPath(
			'/path/to/src/pages/index.pug',
			'/path/to/src',
			'/path/to/dist',
			'.html',
		);
		expect(info.outputPath).toBe('/path/to/dist/pages/index.html');
		expect(info.name).toBe('index');
		expect(info.extension).toBe('.pug');
		expect(info.relDir).toBe('pages');
		expect(info.rootRelPath).toBe('pages/index');
		expect(info.rootRelPathWithExt).toBe('pages/index.html');
	});

	test('case 02: file in root directory', () => {
		const info = computeOutputPath(
			'/path/to/src/index.pug',
			'/path/to/src',
			'/path/to/dist',
			'.html',
		);
		expect(info.outputPath).toBe('/path/to/dist/index.html');
		expect(info.name).toBe('index');
		expect(info.extension).toBe('.pug');
		expect(info.relDir).toBe('');
		expect(info.rootRelPath).toBe('index');
		expect(info.rootRelPathWithExt).toBe('index.html');
	});

	test('case 03: nested directory structure', () => {
		const info = computeOutputPath(
			'/path/to/src/pages/about/contact.pug',
			'/path/to/src',
			'/path/to/dist',
			'.html',
		);
		expect(info.outputPath).toBe('/path/to/dist/pages/about/contact.html');
		expect(info.name).toBe('contact');
		expect(info.extension).toBe('.pug');
		expect(info.relDir).toBe('pages/about');
		expect(info.rootRelPath).toBe('pages/about/contact');
		expect(info.rootRelPathWithExt).toBe('pages/about/contact.html');
	});

	test('case 04: extension change from .scss to .css', () => {
		const info = computeOutputPath(
			'/path/to/src/styles/main.scss',
			'/path/to/src',
			'/path/to/dist',
			'.css',
		);
		expect(info.outputPath).toBe('/path/to/dist/styles/main.css');
		expect(info.name).toBe('main');
		expect(info.extension).toBe('.scss');
		expect(info.relDir).toBe('styles');
		expect(info.rootRelPath).toBe('styles/main');
		expect(info.rootRelPathWithExt).toBe('styles/main.css');
	});

	test('case 05: extension change from .ts to .js', () => {
		const info = computeOutputPath(
			'/path/to/src/scripts/app.ts',
			'/path/to/src',
			'/path/to/dist',
			'.js',
		);
		expect(info.outputPath).toBe('/path/to/dist/scripts/app.js');
		expect(info.name).toBe('app');
		expect(info.extension).toBe('.ts');
		expect(info.relDir).toBe('scripts');
		expect(info.rootRelPath).toBe('scripts/app');
		expect(info.rootRelPathWithExt).toBe('scripts/app.js');
	});

	test('case 06: empty extension', () => {
		const info = computeOutputPath(
			'/path/to/src/assets/image.png',
			'/path/to/src',
			'/path/to/dist',
			'',
		);
		expect(info.outputPath).toBe('/path/to/dist/assets/image');
		expect(info.name).toBe('image');
		expect(info.extension).toBe('.png');
		expect(info.relDir).toBe('assets');
		expect(info.rootRelPath).toBe('assets/image');
		expect(info.rootRelPathWithExt).toBe('assets/image');
	});

	test('case 07: relative paths', () => {
		const cwd = process.cwd();
		const info = computeOutputPath('./src/pages/index.pug', './src', './dist', '.html');
		expect(info.outputPath).toBe(path.resolve(cwd, 'dist/pages/index.html'));
		expect(info.name).toBe('index');
		expect(info.extension).toBe('.pug');
		expect(info.relDir).toBe('pages');
		expect(info.rootRelPath).toBe('pages/index');
		expect(info.rootRelPathWithExt).toBe('pages/index.html');
	});

	test('case 08: uppercase extension', () => {
		const info = computeOutputPath(
			'/path/to/src/pages/index.PUG',
			'/path/to/src',
			'/path/to/dist',
			'.html',
		);
		expect(info.outputPath).toBe('/path/to/dist/pages/index.html');
		expect(info.name).toBe('index');
		expect(info.extension).toBe('.pug');
		expect(info.relDir).toBe('pages');
		expect(info.rootRelPath).toBe('pages/index');
		expect(info.rootRelPathWithExt).toBe('pages/index.html');
	});

	test('case 09: mixed case extension', () => {
		const info = computeOutputPath(
			'/path/to/src/styles/main.ScSs',
			'/path/to/src',
			'/path/to/dist',
			'.css',
		);
		expect(info.outputPath).toBe('/path/to/dist/styles/main.css');
		expect(info.name).toBe('main');
		expect(info.extension).toBe('.scss');
		expect(info.relDir).toBe('styles');
		expect(info.rootRelPath).toBe('styles/main');
		expect(info.rootRelPathWithExt).toBe('styles/main.css');
	});
});
