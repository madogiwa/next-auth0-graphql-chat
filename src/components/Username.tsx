import { useAuth0 } from '@auth0/auth0-react'

const Username = () => {
  const { user, isLoading, isAuthenticated, error, loginWithRedirect, logout } = useAuth0()

  if (isLoading) {
    return <span>...</span>
  }

  if (error) {
    return <span>Error {error.message}</span>
  }

  if (isAuthenticated) {
    return (
      <>
        <span>Login as {user.name}</span>
        <span> | </span>
        <span
          onClick={() => {
            logout({ returnTo: window.location.origin })
          }}
        >
          logout
        </span>
      </>
    )
  }

  const onClickCallback = () => {
    return loginWithRedirect({
      appState: { returnTo: typeof window !== 'undefined' ? window.location.pathname : '/' },
    })
  }

  return (
    <>
      <span onClick={onClickCallback}>LogIn</span>
    </>
  )
}

export default Username
