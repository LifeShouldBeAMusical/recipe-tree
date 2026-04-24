import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { baseConfig } from './config'

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
	cache,
	uri: baseConfig.graphqlBaseUri
})
