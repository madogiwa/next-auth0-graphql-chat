import { useAuth0 } from '@auth0/auth0-react'

const Username = () => {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0()

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

  return (
    <>
      <span onClick={loginWithRedirect}>LogIn</span>
    </>
  )
}

export default Username
