import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: 'http://127.0.0.1:8000/graphql',
	documents: ['../client/src/gql/queries/*.ts', '../client/src/gql/queries/**/*.ts'],
	generates: {
		'./src/gql/': {
			preset: 'client',
			config: { useTypeImports: true, scalars: { Union: 'number', DateTime: 'Date' } },
			presetConfig: { gqlTagName: 'gql' }
		},
		'./src/gql/types.ts': {
			config: { useTypeImports: true, scalars: { Union: 'number', DateTime: 'Date' } },
			plugins: ['typescript', 'typescript-operations']
		}
	}
}

export default config
