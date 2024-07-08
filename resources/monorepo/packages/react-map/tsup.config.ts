import { defineConfig, Options } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig((opts: Options) => ({
  entry: ['src/index.ts'],
  minify: !opts.watch,
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  treeshake: true,
  esbuildPlugins: [sassPlugin()],
}))
