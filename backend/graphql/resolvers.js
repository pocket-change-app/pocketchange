const { gql, ApolloError } = require('apollo-server');
const resolvers = {
    Query: {
        user: async (parent, { userID }, { User }) => {
          if (userID === '') {
            return null;
          }
          const userInfo = await User.findOne({ where : {id: userID}});
          if (userInfo) {
            return {
              "userID": userInfo.dataValues.id
            }
          } else {
            throw new ApolloError(`userID:${userID} doesn't exist`);
            return {};
          }
        },
        business: async (parent, { busID }, { Business}) => {
          if (busID === '') {
            return null;
          }
          const businessInfo = await Business.findOne({ where : {id: busID}});
          if(businessInfo){
              return {
                "busID": businessInfo.dataValues.id,
                "pocketID": businessInfo.dataValues.pocketId,
              }

          }
          else {
            throw new ApolloError(`businessID:${busID} doesn't exist`);
            return {};
          }
        }
    }
}
module.exports = resolvers