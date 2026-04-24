import eslint from '@eslint/js'
import pluginPrettier from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default defineConfigWithVueTs(
	eslint.configs.recommended,
	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	pluginPrettier,
	{ ignores: ['dist/**', 'coverage/**'] },
	// TODO: Fix these
	{
		files: ['server.cjs'],
		rules: { '@typescript-eslint/no-require-imports': 'off', 'no-undef': 'off' }
	},
	{
		files: ['vuetify.config.js'],
		rules: { 'no-undef': 'off' }
	}
)
