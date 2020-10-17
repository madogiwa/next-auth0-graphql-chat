import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/link-context'
import { useAuth0 } from '@auth0/auth0-react'

const MyApolloProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    link: isAuthenticated ? authLink.concat(httpLink) : authLink,
    cache: new InMemoryCache(),
    ssrMode: !process.browser,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default MyApolloProvider
