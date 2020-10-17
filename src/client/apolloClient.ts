import { ApolloClient, InMemoryCache } from '@apollo/client'

export const graphqlClient = (): ApolloClient<any> => {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  })
  return client
}
