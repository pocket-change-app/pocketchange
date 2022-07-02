const {mergeTypes} = require('merge-graphql-schemas') 

// SCALAR TYPES
const ScalarTypeDefs = require('./schema/scalarTypeDefs')

// TYPE DEFINITIONS
const BusinessTypeDefs = require('./schema/Business/typeDefinitions')
const ChangeTypeDefs = require('./schema/Change/typeDefinitions')
const PocketTypeDefs = require('./schema/Pocket/typeDefinitions')
const PocketManagerTypeDefs = require('./schema/PocketManager/typeDefinitions')
const TransactionTypeDefs = require('./schema/Transaction/typeDefinitions')
const UserTypeDefs= require('./schema/User/typeDefinitions')

// Type definitions for graph nodes as returned structures
module.exports = mergeTypes([
  ScalarTypeDefs,

  BusinessTypeDefs,
  ChangeTypeDefs,
  PocketTypeDefs,
  PocketManagerTypeDefs,
  TransactionTypeDefs,
  UserTypeDefs

])