const {mergeResolvers} = require('merge-graphql-schemas') 

//RESOLVERS
const BusinessResolver = require('./schema/Business/resolvers')
const ChangeResolver = require('./schema/Change/resolvers')
const PocketResolver = require('./schema/Pocket/resolvers')
const TransactionResolver = require('./schema/Transaction/resolvers')
const UserResolver = require('./schema/User/resolvers')

// Resolvers define instructions for query results and mutation handling
module.exports = mergeResolvers([
  BusinessResolver,
  ChangeResolver,
  PocketResolver,
  TransactionResolver,
  UserResolver
])