import { ApolloServer } from 'apollo-server-micro'
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools'
import path from 'path'

const typesArray = loadFilesSync(path.join(process.cwd(), 'graphql'), { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(typesArray)

console.log(__dirname)
console.log(path.join(__dirname, './graphql'))
console.dir(typesArray)
console.dir(typeDefs)

const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    users(parent, args, context) {
      return [{ name: 'データ1' }, { name: 'データ2' }]
    },
    user(parent, args, context) {
      return { name: 'データ1' }
    },
  },
}

const apolloServer = new ApolloServer({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  typeDefs,
  resolvers,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
