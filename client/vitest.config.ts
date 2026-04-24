import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
	{
		...viteConfig,
		plugins: [
			vue({
				template: {
					compilerOptions: {
						isCustomElement: (tag) =>
							tag.startsWith('ol-') || ['flag', 'router-link', 'RouterView'].includes(tag)
					}
				}
			}),
			vueJsx(),
			vuetify()
		]
	},
	defineConfig({
		define: { global: 'window' },
		test: {
			coverage: {
				provider: 'istanbul',
				exclude: [
					'dist/*',
					'codegen.ts',
					'cypress/*',
					'src/gql/*',
					'eslint.config.ts',
					'vitest.config.ts',
					'server.cjs',
					'src/test-util/*',
					'src/client.ts',
					'src/config.ts',
					'src/main.ts',
					'src/router/index.ts'
				],
				thresholds: {
					statements: 95,
					branches: 90,
					functions: 95,
					lines: 95
				}
			},
			environment: 'jsdom',
			exclude: [...configDefaults.exclude, 'e2e/*'],
			root: fileURLToPath(new URL('./', import.meta.url))
		}
	})
)
