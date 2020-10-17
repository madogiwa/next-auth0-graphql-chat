import { QueryResolvers, Resolvers } from './gen'

type Context = {
  idToken: { uid: string } | null
}

const Query: QueryResolvers<Context> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async users(_parent, _args, context, _info) {
    return [
      { id: '1', name: 'データ1' },
      { id: '2', name: 'データ2' },
    ]
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async user(_parent, _args, context, _info) {
    return { id: '1', name: 'データ1' }
  },
}

const resolvers: Resolvers<Context> = {
  Query,
}

export default resolvers
