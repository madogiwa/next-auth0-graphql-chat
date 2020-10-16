import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Layout from '../components/Layout'

const My = () => {
  const { user } = useAuth0()

  return (
    <Layout title="MyPage">
      <h1>MyPage</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>Nickname: {user.nickname}</li>
        <li>Email: {user.email}</li>
      </ul>
    </Layout>
  )
}

export default withAuthenticationRequired(My)
