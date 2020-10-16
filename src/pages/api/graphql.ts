import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    users(parent, args, context) {
      return [{ name: 'データ1' }, { name: 'データ2' }]
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
