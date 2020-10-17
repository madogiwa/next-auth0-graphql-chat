import Router from 'next/router'
import { AppProps } from 'next/app'
import { Auth0Provider } from '@auth0/auth0-react'
import { ApolloProvider } from '@apollo/client'
import { graphqlClient } from '../client/apolloClient'

const App = ({ Component, pageProps }: AppProps) => {
  const onRedirectCallback = (appState: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Router.replace(appState?.returnTo || '/')
  }

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/callback` : ''

  const client = graphqlClient()

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
      scope="read:users"
    >
      <ApolloProvider client={client}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ApolloProvider>
    </Auth0Provider>
  )
}

export default App
