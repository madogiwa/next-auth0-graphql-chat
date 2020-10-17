import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAuth0 } from '@auth0/auth0-react'

const MyApolloProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0()

  const httpLink = createHttpLink({
    uri: '/api/graphql',
  })

  const authLink = setContext(async (_, { headers, ...context }) => {
    const token = await getAccessTokenSilently()
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...context,
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default MyApolloProvider
