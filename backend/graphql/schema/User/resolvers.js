const { gql, ApolloError } = require('apollo-server');
const obfuscate = require('../helpers/obfuscate')
const validate = require('../helpers/validate')

module.exports = {
    Query: {
        user: async (parent, { userID }, { User, mongoUser }) => {
          //check to make sure userID was given
            if (userID === '') {
              return null;
            }
            //find the mongo and SQL user
            const userInfo = await User.findOne({ where : {userID: userID}});
            const mongoUserInfo = await mongoUser.findOne({ userID});
            if (userInfo && mongoUserInfo) {
              return {
                userID: mongoUserInfo.userID,
                username: mongoUserInfo.username,
                name: mongoUserInfo.name,
                home: mongoUserInfo.home,
                birthDate: mongoUserInfo.birthDate,
                totalChange: Math.round((Number(mongoUserInfo.totalChange) + Number.EPSILON) * 100) / 100,
                emailAddress: mongoUserInfo.emailAddress
              }

              }
            else {
              throw new ApolloError(`userID:${userID} doesn't exist`);
              return {};
            }
        },
          loginUser: async (parent, { username, password }, { mongoUser, User}) => {
            const user = await mongoUser.findOne({ username })
            if (user){
              const userTable = await User.findOne({where:{userID: user.userID}})
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
                throw new ApolloError(`username:${user.userID} doesn't exist in SQL`);
              }
            }
            else {
              throw new ApolloError(`username:${username} doesn't exist in MongoDB`);
            }
        },
    },
  
    Mutation: {
        registerUser: async (parent, { 
          username, 
          name,
          home,
          birthDate,
          password,
          emailAddress
        }, { User, mongoUser }) => {
            const encryptpass = obfuscate(password);
            const existing = await mongoUser.findOne({ username })
            if (!existing) {
              const newUser = await User.create({ salt: encryptpass.salt});
              const newMongoUser = await mongoUser.create({ 
                userID: newUser.userID, 
                username:username, 
                password: encryptpass.hash, 
                name: name,
                home: home,
                birthDate: birthDate,
                totalChange: Math.round((Number.EPSILON) * 100) / 100 ,
                emailAddress: emailAddress
              })
              newMongoUser.save()
              return {
                userID: newMongoUser.userID,
                username: newMongoUser.username,
                name: newMongoUser.name,
                home: newMongoUser.home,
                birthDate: newMongoUser.birthDate,
                totalChange: Math.round((Number(newMongoUser.totalChange) + Number.EPSILON) * 100) / 100,
                emailAddress: newMongoUser.emailAddress
              }
            } else {
              throw new ApolloError('User already exists, or username taken')
            }
        },  
    }
  }