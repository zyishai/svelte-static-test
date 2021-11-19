const svelte = require('rollup-plugin-svelte');
const resolve = require('@rollup/plugin-node-resolve').default;
const virtual = require('@rollup/plugin-virtual');
const fs = require('fs');
const path = require('path');

const pagesFileNames = fs.readdirSync(path.resolve(__dirname, 'src', 'pages'));
const pagesPaths = pagesFileNames.map((filename) =>
  path.join(__dirname, 'src', 'pages', filename),
);

const hydratableScriptsConfigs = pagesFileNames.map((filename) => ({
  input: filename.replace('.svelte', ''),
  output: {
    format: 'iife',
    dir: path.resolve(__dirname, 'client'),
    entryFileNames: '[name].js',
  },
  plugins: [
    virtual({
      [filename.replace('.svelte', '')]: `
        import ${filename.replace('.svelte', '')} from '${path.join(
        __dirname,
        'src',
        'pages',
        filename,
      )}';

        new ${filename.replace('.svelte', '')}({
          target: document.body,
          hydrate: true,
          props: SERVER_DATA
        });
      `,
    }),
    svelte({
      compilerOptions: {
        dev: false,
        hydratable: true,
      },
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
  ],
}));

module.exports = [
  {
    input: pagesPaths,
    output: {
      format: 'cjs',
      dir: path.resolve(__dirname, 'ssr'),
      entryFileNames: '[name].js',
      exports: 'default',
    },
    plugins: [
      svelte({
        compilerOptions: {
          dev: false,
          immutable: true,
          generate: 'ssr',
          hydratable: true,
        },
      }),
      resolve({
        dedupe: ['svelte'],
      }),
    ],
  },
  ...hydratableScriptsConfigs,
];
