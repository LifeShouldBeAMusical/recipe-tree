export const appVersion = {
	number: '0.0.1',
	stage: 'alpha',
	release: ''
}

export const devUri = 'http://127.0.0.1'
export const prodUri = ''
export const graphqlPort = '8000'
export const graphqlEndpoint = '/graphql'

export const isDevEnvironment = () => {
	return process.env.NODE_ENV === 'development'
}

const useUriBasedOnEnv = () => (isDevEnvironment() ? devUri : prodUri)

const buildBaseUri = () => useUriBasedOnEnv() + ':' + graphqlPort + graphqlEndpoint

export const baseConfig = {
	graphqlBaseUri: buildBaseUri()
}

// Feature Flags
export const GlacierGraveyardSectionFeatureFlag = false
export const LanguageSelectorFeatureFlag = true
