import { ApolloServer } from 'apollo-server-micro'
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import resolvers from '../../server/graphqlResolvers'

const typesArray = loadFilesSync(path.join(process.cwd(), 'graphql'), { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(typesArray)

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

const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' })

const handler = (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  return apolloHandler(_req, res)
}

export default handler
