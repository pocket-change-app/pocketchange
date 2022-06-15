const { gql, ApolloError } = require('apollo-server');
const resolvers = {
    Query: {
        user: async (parent, { userId }, { User }) => {
          return null;
        }
    }
}
module.exports = resolvers