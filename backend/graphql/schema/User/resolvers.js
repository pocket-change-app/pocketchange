const { gql, ApolloError } = require('apollo-server');
const {obfuscate, validate} =require('../../utils')
const { decimalNested} = require('../../utils')
const {Op} = require('sequelize');
const R = require('ramda');

module.exports = {
    Query: {
        user: async (parent, { userID }, { User, mongoUser }) => {
          //check to make sure userID was given
            if (userID == null) {
              return null;
            }
            //find the mongo user
            //const userInfo = await User.findOne({ where : {userID: userID}});
            const mongoUserInfo = await mongoUser.findOne({ userID});
            if (mongoUserInfo) {
              return {
                userID: mongoUserInfo.userID,
                firstName: mongoUserInfo.firstName,
                lastName: mongoUserInfo.lastName,
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
        loginUser: async (parent, { emailAddress, password }, { mongoUser, User}) => {
            const user = await mongoUser.findOne({ emailAddress })
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
                throw new ApolloError(`emailAddress:${user.emailAddress} doesn't exist in SQL`);
              }
            }
            else {
              throw new ApolloError(`emailAddress:${emailAddress} doesn't exist in MongoDB`);
            }
        },
        getAllUsers: async (parent, { userID }, { mongoUser, User}) => {
          let mongoUserInfo;
          if(userID != null){
             mongoUserInfo = await mongoUser.findOne({ userID: userID })
             //console.log("USER NAME SPEC", mongoUserInfo)
             if(mongoUserInfo){
              return [{
                userID: mongoUserInfo.userID,
                firstName: mongoUserInfo.firstName,
                lastName: mongoUserInfo.lastName,
                home: mongoUserInfo.home,
                birthDate: mongoUserInfo.birthDate,
                totalChange: parseFloat(mongoUserInfo.totalChange).toFixed(2),
                emailAddress: mongoUserInfo.emailAddress
              }]
             }
             else {
              throw new ApolloError(`userID:${userID} doesn't exist in MongoDB`);
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
        getUserRoles: async (parent, { userID }, { mongoUser, WorksAt, IsMember, mongoBusiness, mongoPocket}) => {
          let businessRoles = []
          let pocketRoles = []
          const worksAtInfo = await WorksAt.findAll({where:{userID: userID}})
          //find all users who work somewhere
          if(worksAtInfo){
            businessRoles = (worksAtInfo.map(function(item){ return {type: 'MERCHANT', level: item.role == 'cashier'? 'EMPLOYEE' : item.role == 'manager' ? 'MANAGER' : 'OWNER', entityID: item.businessID}}))
          }
          const isMemberInfo = await IsMember.findAll({where:{userID: userID, role: 'manager'}})
          if(isMemberInfo){
            pocketRoles =(isMemberInfo.map(function(item){ 
              return {type: 'LEADER', entityID: item.pocketID} 
            }))
          }
          let roles = businessRoles.concat(pocketRoles, [{type: 'CONSUMER'}])
          async function addEntityNames (roles) {
            let finalRoles=[]
            await Promise.all(roles.map(async (role, index) => {
              try {
                let entityName;
                let entityInfo;
                if(role.type != 'CONSUMER'){
                  if(role.type == 'LEADER'){
                    entityInfo = await mongoPocket.findOne({pocketID: role.entityID})
                    entityName = entityInfo.pocketName
                  }
                  if(role.type == 'MERCHANT'){
                    entityInfo = await mongoBusiness.findOne({businessID: role.entityID})
                    entityName = entityInfo.businessName
                  }
                  finalRoles.push({type:role.type, level: role.level ? role.level : null, entityID: role.entityID, entityName: entityName})
                }
                else{
                  finalRoles.push({type:'CONSUMER'})
                }
              } catch (error) {
                console.log('error'+ error);
              }
            }))
            console.log('complete all') // gets loged first
            return finalRoles // return without waiting for process of 
          }
          let finalRoles = addEntityNames(roles)
          console.log(finalRoles)
          //finalRoles = finalRoles.concat([{type: 'CONSUMER'}])
          return finalRoles
        },
        getUsersThatLove: async (parent, { businessID }, { mongoUser, Loves}) => {
          //find all users that love business
          const lovesInfo = await Loves.findAll({where:{businessID: businessID}})
          //find all users
          //console.log(lovesInfo)
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
          //console.log(transactionInfo)
          transactionInfo = decimalNested(transactionInfo,'value', 'dataValues' )
          //console.log(transactionInfo)
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
          userID, 
          firstName,
          lastName,
          home,
          birthDate,
          emailAddress
        }, { User, mongoUser }) => {

          console.log("BIRTH:", birthDate)

            console.log('IN USER REGISTER RESOLVER')
            console.log(userID, firstName, lastName)
            const existingUserID = await mongoUser.findOne({ userID })
            const existingEmail = await mongoUser.findOne({ emailAddress })
            if (!(existingUserID | existingEmail)) {
              const newUser = await User.create({userID: userID}); 
              //console.log(newUser.toJSON())
              const newMongoUser = await mongoUser.create({ 
                userID: userID, 
                firstName: firstName,
                lastName: lastName,
                home: home,
                birthDate: birthDate,
                totalChange:  parseFloat(0).toFixed(4),
                emailAddress: emailAddress,
                deactivated: false,
              })
              newMongoUser.save()
              console.log('USER CREATED,', newMongoUser)
              return {
                userID: newMongoUser.userID,
                firstName: newMongoUser.firstName,
                lastName: newMongoUser.lastName,
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
        deactivateUser: async (parent, { 
          userID
        }, { User, mongoUser}) => {
              await mongoUser.updateOne({ userID: userID },
                {
                  deactivated: true,
                })
              const mongoUserInfo = await mongoUser.findOne({ userID: userID })
              return(mongoUserInfo) 
        },
        updatePassword: async (parent, { 
          userID,
          password
        }, { User, mongoUser }) => {
            const encryptpass = obfuscate(password);
            //check to make sure user exists
            const userInfo = await mongoUser.findOne({ userID })
            if (userInfo) {
              await User.update({ salt: encryptpass.salt, where: {userID: userID}});
              await userInfo.updateOne({ 
                password: encryptpass.hash
              })
              userInfo.save()
              return {
                userID: userInfo.userID,
                username: userInfo.username,
                name: userInfo.name,
                home: userInfo.home,
                birthDate: userInfo.birthDate,
                totalChange:  parseFloat(userInfo.totalChange).toFixed(2),
                emailAddress: userInfo.emailAddress,
                deactivated:  userInfo.deactivated,
              }
            } else {
              throw new ApolloError('User does not exist')
            }
        },
        updateUserProfile: async (parent, { 
          userID, 
          firstName,
          lastName,
          home,
          birthDate,
          emailAddress
        }, { User, mongoUser }) => {
            //check to make sure the user exists 
            const userInfo = await mongoUser.findOne({ userID })
            if (userInfo) {
              const updatedUser = await mongoUser.updateOne({userID: userID},
                {
                  firstName: firstName == null ? userInfo.firstName : firstName,
                  lastName: lastName == null ? userInfo.lastName : lastName,
                  home: home == null ? userInfo.home : home,
                  emailAddress: emailAddress == null ? userInfo.emailAddress : emailAddress,
                  birthDate: birthDate == null ? userInfo.birthDate : birthDate,
                })
              updatedUser.save()
              return {
                userID: updatedUser.userID,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                home: updatedUser.home,
                birthDate: updatedUser.birthDate,
                totalChange:  parseFloat(updatedUser.totalChange).toFixed(2),
                emailAddress: updatedUser.emailAddress,
                deactivated:  updatedUser.deactivated,
              }
            } 
            else {
              throw new ApolloError('this isn\'t the owner of the business or pocketchange admin')
            }
        }, 
        loveOrUnloveBusiness: async (parent, { 
          userID, 
          businessID
        }, { User, mongoBusiness, mongoUser, Loves }) => {
            //check to make sure the user exists 
            const userInfo = await mongoUser.findOne({ userID })
            //check to make sure the business exists
            const mongoBusinessInfo = await mongoBusiness.findOne(businessID)
            if (userInfo && mongoBusinessInfo && userInfo.deactivated == false && mongoBusinessInfo.deactivated == false) {
              //both exist & are active
              //so find if user and business love relationship already exists
              let lovesInfo = await Loves.findOne({where: {userID: userID, businessID: businessID}})
              if(lovesInfo){
                //user already loves this business so UNlove it
                await lovesInfo.destroy()
              }
              else{
                //user doesn't yet love this business so LOVE it
                lovesInfo = await Loves.create({userID: userID, businessID: businessID})
                lovesInfo.save()
              }
              //return userInfo
              return {
                userID: userInfo.userID,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                home: userInfo.home,
                birthDate: userInfo.birthDate,
                totalChange:  parseFloat(userInfo.totalChange).toFixed(2),
                emailAddress: userInfo.emailAddress,
                deactivated:  userInfo.deactivated,
              }
            } 
            else {
              throw new ApolloError('the userID or businessID is invalid or no longer active')
            }
        },
          updateUserLocations: async (parent, { 
            userID, 
            latitude,
            longitude
          }, { mongoUser, Geolocation }) => {
              //check to make sure the user exists 
              const userInfo = await mongoUser.findOne({ userID })
              if (userInfo &&  userInfo.deactivated == false ) {
                //user is active and exists so add their geolocation data
                //so find if user and business love relationship already exists
                const date = new Date()
                await Geolocation.create({userID: userID, latitude: latitude, longitude: longitude, timestamp: date})
                //return userInfo
                return {
                  userID: userInfo.userID,
                  firstName: userInfo.firstName,
                  lastName: userInfo.lastName,
                  home: userInfo.home,
                  birthDate: userInfo.birthDate,
                  totalChange:  parseFloat(userInfo.totalChange).toFixed(2),
                  emailAddress: userInfo.emailAddress,
                  deactivated:  userInfo.deactivated,
                }
              } 
              else {
                throw new ApolloError('the userID is invalid or no longer active')
              }
          }, 
          addUserRole: async (parent, { 
            userID, 
            role,
            businessID
          }, { User, mongoBusiness, mongoUser, WorksAt }) => {
              //check to make sure the user exists 
              const userInfo = await mongoUser.findOne({ userID })
              //check to make sure the business exists
              const mongoBusinessInfo = await mongoBusiness.findOne(businessID)
              if (userInfo && mongoBusinessInfo && userInfo.deactivated == false && mongoBusinessInfo.deactivated == false) {
                //both exist & are active
                //so find if user and business role work relationship already exists
                let worksAtInfo = await WorksAt.findOne({where: {userID: userID, businessID: businessID, role: role}})
                if(worksAtInfo){
                  //user already works at this business in this role so 
                  throw new ApolloError(`the userID:${userID}already has this role: ${role} at this businessID:${businessID}`)
                }
                else{
                  //user doesn't yet have this role at this business
                  worksAtInfo = await WorksAt.create({userID: userID, businessID: businessID, role: role})
                  worksAtInfo.save()
                }
                //return userInfo
                return {
                  userID: userInfo.userID,
                  firstName: userInfo.firstName,
                  lastName: userInfo.lastName,
                  home: userInfo.home,
                  birthDate: userInfo.birthDate,
                  totalChange:  parseFloat(userInfo.totalChange).toFixed(2),
                  emailAddress: userInfo.emailAddress,
                  deactivated:  userInfo.deactivated,
                }
              } 
              else {
                throw new ApolloError('the userID or businessID is invalid or no longer active')
              }
          },
          removeUserRole: async (parent, { 
            userID, 
            role,
            businessID
          }, { User, mongoBusiness, mongoUser, WorksAt }) => {
              //check to make sure the user exists 
              const userInfo = await mongoUser.findOne({ userID })
              //check to make sure the business exists
              const mongoBusinessInfo = await mongoBusiness.findOne(businessID)
              if (userInfo && mongoBusinessInfo && userInfo.deactivated == false && mongoBusinessInfo.deactivated == false) {
                //both exist & are active
                //so find if user and business role work relationship already exists
                let worksAtInfo = await WorksAt.findOne({where: {userID: userID, businessID: businessID, role: role}})
                if(worksAtInfo){
                  //user works at this business in this role so  remove it 
                  await worksAtInfo.destroy()
                }
                else{
                  //user doesn't yet have this role at this business
                  throw new ApolloError(`the userID:${userID}already does not have this role: ${role} at this businessID:${businessID}`)
                }
                //return userInfo
                return {
                  userID: userInfo.userID,
                  firstName: userInfo.firstName,
                  lastName: userInfo.lastName,
                  home: userInfo.home,
                  birthDate: userInfo.birthDate,
                  totalChange:  parseFloat(userInfo.totalChange).toFixed(2),
                  emailAddress: userInfo.emailAddress,
                  deactivated:  userInfo.deactivated,
                }
              } 
              else {
                throw new ApolloError(`the userID:${userID} or businessID: ${businessID} is invalid or no longer active`)
              }
          },
          pickWinner: async (parent, { 
            contestID, 
            userID,
          }, { Contest, mongoContest, IsMember, WorksAt, mongoUser}) => {
            const isMemberInfo = await IsMember.findOne({ where:{ userID: userID, pocketID: pocketID}})
            if(isMemberInfo && isMemberInfo.dataValues.role == 'manager' || userID == 'pocketchangeAdmin'){
            //the user is the current manager or is pocketChange admin so they can update the comp to pick winner and close the comp
            //the user is the manger of the pocket proceed (or its pocketchange admin)
            //deactivate the comp (?)
              // await mongoContest.updateOne({ contestID: contestID },
              //   {
              //     status: {
              //       pending: false,
              //       approved: false,
              //       deactivated: true
              //     },
              //   })
                //get contest
                const contest = await Contest.findOne({where:{contestID: contestID}})
                const startDate = contest.dataValues.startDate
                const endDate = contest.dataValues.endDate
                //get a list of all the userIDs from the QRscan table within a date
                let filterScans = []
                filterScans.push({date: {
                  [Op.between]: [startDate, endDate]
                }})
                filterScans.push({'userID': userID})
                let QRScanInfo;

                // WITH MinTranstable AS
                //       (SELECT [UserName],
                //               min([TransDate]) AS MinDate
                //       FROM [dbo]. [Transactions]
                //       GROUP BY [UserName])
                //     SELECT [Transactions].UserName,
                //           [Transactions].TransDate,
                //           [Transactions].Amount
                //     FROM [dbo].[Transactions]
                //     INNER JOIN MinTranstable ON [Transactions].username = MinTranstable.username
                //     AND [Transactions].TransDate = MinTranstable.MinDate
                QRScanInfo = await QRScan.findAll({ 
                  where: filterTransactions,
                })
                const userIDs = R.pluck("userID", QRScanInfo);
                const randomWinner = userIDs[Math.floor(Math.random() * userIDs.length)];
                const winnerInfo = User.find({userID:randomWinner})
                //update the winner in the mongocontest data
                await mongoContest.updateOne({ contestID: contestID },
                {
                  winner: randomWinner,
                })
                return {
                  userID: winnerInfo.userID,
                  firstName: winnerInfo.firstName,
                  lastName: winnerInfo.lastName,
                  home: winnerInfo.home,
                  birthDate: winnerInfo.birthDate,
                  totalChange:  parseFloat(winnerInfo.totalChange).toFixed(2),
                  emailAddress: winnerInfo.emailAddress,
                  deactivated:  winnerInfo.deactivated,
                }
              } 
              else {
                throw new ApolloError(`the userID:${userID} or businessID: ${businessID} is invalid or no longer active`)
              }
          },
    }
  }