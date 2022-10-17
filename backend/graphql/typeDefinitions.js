const { mergeTypeDefs } = require('@graphql-tools/merge')

// SCALAR TYPES
const ScalarTypeDefs = require('./schema/scalarTypeDefs')

// TYPE DEFINITIONS
const BusinessTypeDefs = require('./schema/Business/typeDefinitions')
const ChangeBalanceTypeDefs = require('./schema/ChangeBalance/typeDefinitions')
const PocketTypeDefs = require('./schema/Pocket/typeDefinitions')
const TransactionTypeDefs = require('./schema/Transaction/typeDefinitions')
const UserTypeDefs= require('./schema/User/typeDefinitions')
const ContestTypeDefs= require('./schema/Contest/typeDefinitions')
const QRScanTypeDefs= require('./schema/QRScan/typeDefinitions')

// Type definitions for graph nodes as returned structures
module.exports = mergeTypeDefs([
  ScalarTypeDefs,

  BusinessTypeDefs,
  ChangeBalanceTypeDefs,
  PocketTypeDefs,
  TransactionTypeDefs,
  UserTypeDefs,
  ContestTypeDefs,
  QRScanTypeDefs

])