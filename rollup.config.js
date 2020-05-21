import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import commonjs from "rollup-plugin-commonjs";

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const pluginsBase = [
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    resolve({ preferBuiltins: true, browser: true }),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
        exclude: 'node_modules/**',
        extensions: ['.ts'],
        runtimeHelpers: true,
    }),
];



export default [
    {
        input: './src/index.ts',
        output: [{ dir: 'dist', format: 'esm' }],
        plugins: pluginsBase,
    },
    {
        input: './src/browser.ts',
        output: [{ format: 'umd', file: 'dist/saaslify.min.js', name: 'Saaslify', exports: 'named' }],
        plugins: [...pluginsBase,   terser()],
        watch: {
            chokidar: true,
          }
    },
];
