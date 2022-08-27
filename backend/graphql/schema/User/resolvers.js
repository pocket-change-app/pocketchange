const { gql, ApolloError } = require('apollo-server');
const {obfuscate, validate} =require('../../utils')
const {decimalValue, decimalNested} = require('../../utils')
const {Op} = require('sequelize');
const R = require('ramda');
const e = require('express');

module.exports = {
    Query: {
        user: async (parent, { userID }, { User, mongoUser }) => {
          //check to make sure userID was given
            if (userID == null) {
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
                totalChange: parseFloat(mongoUserInfo.totalChange).toFixed(2),
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
        getAllUsers: async (parent, { username }, { mongoUser, User}) => {
          let mongoUserInfo;
          if(username != null){
             mongoUserInfo = await mongoUser.findOne({ username: username })
             console.log("USER NAME SPEC", mongoUserInfo)
             if(mongoUserInfo){
              return [{
                userID: mongoUserInfo.userID,
                username: mongoUserInfo.username,
                name: mongoUserInfo.name,
                home: mongoUserInfo.home,
                birthDate: mongoUserInfo.birthDate,
                totalChange: parseFloat(mongoUserInfo.totalChange).toFixed(2),
                emailAddress: mongoUserInfo.emailAddress
              }]
             }
             else {
              throw new ApolloError(`username:${username} doesn't exist in MongoDB`);
            }
          }
          else{
            //specify lean to avoid internal state saving
            mongoUserInfo = await mongoUser.find({}).lean()
            if(mongoUserInfo){
              //map totalChange values to 2 decimal places
              return mongoUserInfo.map((obj, i) => ({...obj, totalChange: parseFloat(R.prop('totalChange', mongoUserInfo[i])).toFixed(2)}));
            }
            else {
             return []
           }
          }
      },
      getUsersThatLove: async (parent, { businessID }, { mongoUser, Loves}) => {
        //find all users that love business
        const lovesInfo = await Loves.findAll({where:{businessID: businessID}})
        //find all users
        console.log(lovesInfo)
        let mongoUserInfo = await mongoUser.find({}).lean()
        if(mongoUserInfo && lovesInfo){
          //map totalChange values to 2 decimal places
          mongoUserInfo = mongoUserInfo.map((obj, i) => ({...obj, totalChange: parseFloat(R.prop('totalChange', mongoUserInfo[i])).toFixed(2)}));
          //join two object arrays by matching userIDs
          const joinByUserID = R.innerJoin(
            (a, b) => a.userID === b.userID
          )
          return joinByUserID(mongoUserInfo, lovesInfo)
        }
        else{
          return []
        }
      },
      getTopUsers: async (parent, { businessID, pocketID, startDate, endDate, userNumber }, { mongoUser, Transaction, sequelizeConnection}) => {
        let filterTransactions = []
        //check to see if type is not null
        if (businessID != null) {
          filterTransactions.push({'businessID': businessID})
        }
        //check to see if subtype is not null
        if (pocketID != null) {
          filterTransactions.push({'pocketID' : pocketID})
        }
        //if date specified
        if(startDate && endDate){
          filterTransactions.push({date: {
            [Op.between]: [startDate, endDate]
          }})
        }
        //search through the transactions within a business or pocket
        let transactionInfo;
        if (filterTransactions.length == 0) {
          //no filters specified get all
          transactionInfo = await Transaction.findAll({    
            attributes: [ 'userID', [sequelizeConnection.fn('COUNT', sequelizeConnection.col('userID')), "userCount"]
            ],
            group: ["userID"],
            order: [ [ sequelizeConnection.fn('COUNT', sequelizeConnection.col('userID')), 'DESC' ]]
          })
        } 
        else {
          //filters specified
          transactionInfo = await Transaction.findAll({ 
            attributes: [ 'userID', [sequelizeConnection.fn('COUNT', sequelizeConnection.col('userID')), "userCount"]
            ],
            where: filterTransactions,
            group: ["userID"],
            order: [ [ sequelizeConnection.fn('COUNT', sequelizeConnection.col('userID')), 'DESC' ]],
          })
        }
        console.log(transactionInfo)
        transactionInfo = decimalNested(transactionInfo,'value', 'dataValues' )
        console.log(transactionInfo)
        if(transactionInfo){
          let userIDs = R.pluck("userID", transactionInfo);
          if(userNumber){
            //cap them at the user Number
            userIDs = userIDs.slice(0, userNumber);
          }
          //find matching users
          let mongoUserInfo = await mongoUser.find({ $and: [{userID: { $in: userIDs } }] }).lean()
          mongoUserInfo = mongoUserInfo.map((obj, i) => ({...obj, totalChange: parseFloat(R.prop('totalChange', mongoUserInfo[i])).toFixed(2)}));
          return mongoUserInfo
        }
        else{ //no transactions found 
          return []
        }
      }
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
                totalChange:  parseFloat(0).toFixed(4),
                emailAddress: emailAddress,
                deactivated: false,
              })
              newMongoUser.save()
              return {
                userID: newMongoUser.userID,
                username: newMongoUser.username,
                name: newMongoUser.name,
                home: newMongoUser.home,
                birthDate: newMongoUser.birthDate,
                totalChange:  parseFloat(newMongoUser.totalChange).toFixed(2),
                emailAddress: newMongoUser.emailAddress,
                deactivated:  newMongoUser.deactivated,
              }
            } else {
              throw new ApolloError('User already exists, or username taken')
            }
        },  
    }
  }