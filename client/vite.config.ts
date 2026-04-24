import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
	// define: { 'globalThis.__DEV__': JSON.stringify(false) },
	assetsInclude: ['**/*.md'],
	plugins: [vue(), vueJsx(), vuetify()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	test: {
		setupFiles: 'vuetify.config.js',
		server: {
			deps: {
				inline: ['vuetify']
			}
		},
		globals: true
	}
})
