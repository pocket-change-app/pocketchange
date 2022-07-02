const { gql, ApolloError } = require('apollo-server');
const obfuscate = require('../helpers/obfuscate')
const validate = require('../helpers/validate')

module.exports = {
    Query: {
        user: async (parent, { userID }, { User, mongoUser }) => {
            if (userID === '') {
              return null;
            }
            const userInfo = await User.findOne({ where : {ID: userID}});
            const mongoUserInfo = await mongoUser.findOne({ userID});
            if (userInfo && mongoUserInfo) {
              return {
                "userID": userInfo.dataValues.ID,
                "username": mongoUserInfo.username,
                "name": mongoUserInfo.name,
                "birthDate": mongoUserInfo.birthDate,
                "totalChange":mongoUserInfo.username,
                "emailAddress": mongoUserInfo.emailAddress,
                "pockets":mongoUserInfo.pockets,
                "favouriteBusiness": mongoUserInfo.favouriteBusiness,
              }
            } else {
              throw new ApolloError(`userID:${userID} doesn't exist`);
              return {};
            }
        },
          loginUser: async (parent, { username, password }, { mongoUser, User}) => {
            const user = await mongoUser.findOne({ username })
            if (user){
              const userTable = await User.findOne({where:{ID: user.userID}})
              if(userTable){
                //console.log(userTable.dataValues.salt)
                //console.log(userTable.dataValues.createdAt)
                const validated = validate(password, user.password, userTable.dataValues.salt)
                if(validated){
                  return user
                }
                else{
                  throw new ApolloError(`password incorrect`);
                }
              }
              else {
                throw new ApolloError(`username:${username} doesn't exist in SQL`);
              }
            }
            else {
              throw new ApolloError(`username:${username} doesn't exist in MongoDB`);
            }
        },
    },
  
    Mutation: {
        registerUser: async (parent, { username, password }, { User, mongoUser,mongoPocketManager, mongoBusiness }) => {
            const encryptpass = obfuscate(password);
            const existing = await mongoUser.findOne({ username })
            const busExisting = await mongoBusiness.findOne({ busname: username })
            const managerExisting = await mongoPocketManager.findOne({ managername: username })
            if (!existing && !busExisting && !managerExisting) {
              const newUser = await User.create({ salt: encryptpass.salt});
              const newMongoUser = await mongoUser.create({ userID: newUser.ID, username:username, password: encryptpass.hash})
              newMongoUser.save()
              return newMongoUser
            } else {
              throw new ApolloError('User already exists, or username taken')
            }
        },  
    }
  }