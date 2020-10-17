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

  const authClient = new ApolloClient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  const noneAuthClient = new ApolloClient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    link: httpLink,
    cache: new InMemoryCache(),
  })

  if (isAuthenticated) {
    return <ApolloProvider client={authClient}>{children}</ApolloProvider>
  }
  return <ApolloProvider client={noneAuthClient}>{children}</ApolloProvider>
}

export default MyApolloProvider
