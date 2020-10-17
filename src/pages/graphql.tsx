import Layout from '../components/Layout'
import { useGetUserNamesQuery } from '../client/gen'

const GraphqlPage = () => {
  const { data, loading, error } = useGetUserNamesQuery()

  if (loading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <Layout title="GraphQL">
      <h1>About</h1>
      <ul>
        {data?.users?.map((u) => (
          <li>{u?.name}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default GraphqlPage
