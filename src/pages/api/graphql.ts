import { ApolloServer } from 'apollo-server-micro'
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { Algorithm } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import resolvers from '../../server/graphqlResolvers'

const typesArray = loadFilesSync(path.join(process.cwd(), 'graphql'), { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(typesArray)

//
// JWT Token verification
//
const client = jwksClient({
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  jwksUri: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/.well-known/jwks.json`,
})

const getKey = (header: any, cb: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  client.getSigningKey(header.kid, function (err, key) {
    if (err != null) {
      console.error(err)
      return
    }
    const signingKey = key.getPublicKey()
    cb(null, signingKey)
  })
}

const options = {
  audience: process.env.NEXT_PUBLIC_AUTH0_IDENTIFIER,
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  issuer: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/`,
  algorithms: ['RS256'] as Algorithm[],
}

const apolloServer = new ApolloServer({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  typeDefs,
  resolvers,
  async context({ req }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = req.headers.authorization?.replace(/^Bearer (.*)/, '$1')
    if (token == null) {
      return { idToken: null }
    }

    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err)
        }
        if (!decoded) {
          return reject(Error('decode error'))
        }
        return resolve((decoded as any).sub)
      })
    })

    return { idToken: user }
  },
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
