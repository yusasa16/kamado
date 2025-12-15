# @kamado-io/pug-compiler

Pug compiler for Kamado. Compiles Pug templates to HTML.

## Installation

```bash
npm install @kamado-io/pug-compiler
# or
yarn add @kamado-io/pug-compiler
```

## Usage

```ts
import { compilePug } from '@kamado-io/pug-compiler';

const html = await compilePug(
	'p Hello, world!',
	{ title: 'My Page' },
	{
		basedir: './src',
		doctype: 'html',
		pretty: true,
	},
);
```

## API

### `compilePug(template, data, options)`

Compiles a Pug template to HTML.

- `template` (string): Pug template string
- `data` (object): Data object to pass to the template
- `options` (object): Pug compiler options
  - `basedir` (string): Base directory for resolving includes
  - `doctype` (string): Document type (default: `'html'`)
  - `pretty` (boolean): Whether to pretty-print HTML (default: `true`)

Returns: `Promise<string>` - Compiled HTML string

## License

MIT
