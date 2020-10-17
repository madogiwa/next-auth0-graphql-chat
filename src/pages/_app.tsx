import Router from 'next/router'
import { AppProps } from 'next/app'
import { Auth0Provider } from '@auth0/auth0-react'
import MyApolloProvider from '../client/provider'

const App = ({ Component, pageProps }: AppProps) => {
  const onRedirectCallback = (appState: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Router.replace(appState?.returnTo || '/')
  }

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/callback` : ''
  const audience = process.env.NEXT_PUBLIC_AUTH0_IDENTIFIER || ''

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
      scope="read:users"
      audience={audience}
    >
      <MyApolloProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </MyApolloProvider>
    </Auth0Provider>
  )
}

export default App
