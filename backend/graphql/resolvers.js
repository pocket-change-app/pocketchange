const {mergeResolvers} = require('@graphql-tools/merge')

//RESOLVERS
const BusinessResolver = require('./schema/Business/resolvers')
const ChangeBalanceResolver = require('./schema/ChangeBalance/resolvers')
const PocketResolver = require('./schema/Pocket/resolvers')
const TransactionResolver = require('./schema/Transaction/resolvers')
const UserResolver = require('./schema/User/resolvers')
const ContestResolver = require('./schema/Contest/resolvers')
const QRScanResolver = require('./schema/QRScan/resolvers')

// Resolvers define instructions for query results and mutation handling
module.exports = mergeResolvers([
  BusinessResolver,
  ChangeBalanceResolver,
  PocketResolver,
  TransactionResolver,
  UserResolver,
  ContestResolver,
  QRScanResolver
])