const { gql, ApolloError } = require('apollo-server');
const crypto = require("crypto");

const obfuscate = (pass) => {
  // (B1) GENERATE RANDOM SALT
  let length = 16;
  let salt =  crypto.randomBytes(Math.ceil(length / 2))
  .toString("hex")
  .slice(0, length); 

  // (B2) SHA512 HASH
  let hash = crypto.createHmac("sha512", salt);
  hash.update(pass);
  return {
    salt: salt,
    hash: hash.digest("hex")
  };
};

// (D) VALIDATE PASSWORD
const validate = (userpass, hashedpass, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(userpass);
  userpass = hash.digest("hex");
  return userpass == hashedpass;
};


const resolvers = {
  Query:{
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
          "emailAddress": mongoUserInfo.emailAddress,
          "pockets":mongoUserInfo.pockets,
          "favouriteBusiness": mongoUserInfo.favouriteBusiness,
        }
      } else {
        throw new ApolloError(`userID:${userID} doesn't exist`);
        return {};
      }
    },
    business: async (parent, { busID }, { Business, mongoBusiness}) => {
      if (busID === '') {
        return null;
      }
      const businessInfo = await Business.findOne({ where : {ID: busID}});
      const mongoBusInfo = await mongoBusiness.findOne({ busID});
      if(businessInfo && mongoBusInfo){
          return {
            "busID": businessInfo.dataValues.ID,
            "pocketID": businessInfo.dataValues.pocketID,
            "busname": mongoBusInfo.busname,
            "emailAddress": mongoBusInfo.emailAddress,
            "role": mongoBusInfo.role
          }

      }
      else {
        throw new ApolloError(`businessID:${busID} doesn't exist`);
        return {};
      }
    },
    pocket: async (parent, { pocketID }, { Pocket, mongoPocket}) => {
      if (pocketID === '') {
        return null;
      }
      const pocketInfo = await Pocket.findOne({ where : {ID: pocketID}});
      const mongoPocketInfo = await mongoPocket.findOne({ pocketID })
      if(pocketInfo && mongoPocketInfo ){
          return {
            "pocketID": pocketInfo.dataValues.ID,
            "circulatingPoints": pocketInfo.dataValues.circulatingPoints,
            "changeRate": pocketInfo.dataValues.changeRate,
            "customers": mongoPocketInfo.customers,
            "businesses": mongoPocketInfo.businesses,
            "pocketName" : mongoPocketInfo.pocketname
          }

      }
      else {
        throw new ApolloError(`pocketID:${pocketID} doesn't exist`);
        return {};
      }
    },
    change: async (parent, { changeID }, { Change }) => {
      if (changeID === '') {
        return null;
      }
      const changeInfo = await Change.findOne({ where : {ID: changeID}});
      if (changeInfo) {
        return {
          "changeID": changeInfo.dataValues.ID,
          "pocketID": changeInfo.pocketID,
          "value": changeInfo.value,
          "customerID":changeInfo.customerID,
          "expiryDate": changeInfo.expiryDate,
        }
      } else {
        throw new ApolloError(`changeID:${changeID} doesn't exist`);
        return {};
      }
    },
    loginUser: async (parent, { username, password }, { mongoUser, User}) => {
      const user = await mongoUser.findOne({ username })
      if (user){
        const userTable = await User.findOne({ID: user.userID})
        if(userTable){
          console.log(userTable.dataValues.salt)
          console.log(userTable.dataValues.createdAt)
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
    loginBus: async (parent, { busname, password }, { mongoBusiness, Business}) => {
      const bus = await mongoBusiness.findOne({ busname })
      if (bus){
        const busTable = await Business.findOne({ID: bus.busID})
        if(busTable){
          const validated = validate(password, bus.password, busTable.dataValues.salt)
          if(validated){
            return bus
          }
          else{
            throw new ApolloError(`password incorrect`);
          }
        }
        else {
          throw new ApolloError(`business username:${busname} doesn't exist in SQL` );
        }
      }
      else {
        throw new ApolloError(`business username:${busname} doesn't exist in MongoDB`);
      }
    },
    getUserChange: async (parent, { userID, pocketID }, { Change}) => {
      const userChange = await Change.findOne({
        userID: userID,
        pocketID: pocketID
      })
      if (userChange){
        return{
          "changeID": userChange.dataValues.ID,
          "pocketID": userChange.pocketID,
          "value": userChange.value,
          "userID":userChange.userID,
          "expiryDate": userChange.expiryDate,
        }
      }
      else {
        throw new ApolloError(`business username:${busname} doesn't exist in SQL` );
      }
    },
  },
  Mutation: {
    registerUser: async (parent, { username, password }, { User, mongoUser, mongoBusiness }) => {
      const encryptpass = obfuscate(password);
      const existing = await mongoUser.findOne({ username })
      const busExisting = await mongoBusiness.findOne({ busname: username })
      if (!existing && !busExisting) {
        const newUser = await User.create({ salt: encryptpass.salt});
        const newMongoUser = await mongoUser.create({ userID: newUser.ID, username:username, password: encryptpass.hash})
        newMongoUser.save()
        return newMongoUser
      } else {
        throw new ApolloError('User already exists, or username taken')
      }
    },
    registerBus: async (parent, { busname, password, pocketID }, { Business, mongoBusiness, mongoUser }) => {
      const encryptpass = obfuscate(password);
      const existing = await mongoBusiness.findOne({ busname: busname })
      const userExisting = await mongoUser.findOne({ username: busname })
      if (!existing && !userExisting) {
        const newBus = await Business.create({ salt: encryptpass.salt, pocketID: pocketID});
        const newMongoBus = await mongoBusiness.create({ 
          busID: newBus.ID, 
          busname: busname, 
          password: encryptpass.hash,
          pocketID: newBus.pocketID
        })
        newMongoBus.save()
        return newMongoBus
      } else {
        throw new ApolloError('Business already exists, or username taken')
      }
    },
    calculateUserChange: async (parent, { userID, pocketID }, { Change, Transaction, sequelizeConnection}) => {
      //SELECT `userID`, `pocketID`, SUM(`changeEarned`) AS `totalChangeEarned` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
      const changeEarnedPerUserPerPocket = await Transaction.findAll({ 
        attributes: ["userID", "pocketID", 
        [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeEarned')), 'totalChangeEarned']
        ],
        group: ["userID", "pocketID"],
        where: {userID: userID, pocketID: pocketID}
      })
      if (changeEarnedPerUserPerPocket[0]){
        const totalChangeEarned = changeEarnedPerUserPerPocket[0].dataValues.totalChangeEarned
        //console.log("change earned", totalChangeEarned)
        //SELECT `userID`, `pocketID`, SUM(`changeRedeemed`) AS `totalChangeRedeemed` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
        const changeRedeemedPerUserPerPocket = await Transaction.findAll({ 
          attributes: ["userID", "pocketID", 
          [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeRedeemed')), 'totalChangeRedeemed']
          ],
          group: ["userID", "pocketID"],
          where: {userID: userID, pocketID: pocketID}
        })
        if (changeRedeemedPerUserPerPocket[0]){
          const totalChangeRedeemed =  changeRedeemedPerUserPerPocket[0].dataValues.totalChangeRedeemed
          //console.log("change redeemed", totalChangeRedeemed)
          const currentChange = totalChangeEarned - totalChangeRedeemed
          //console.log("CUR CHANGE", currentChange)
          //update the User change
          const userChange = await Change.findOne({
            userID: userID,
            pocketID: pocketID
          })
          if (userChange){
            await userChange.update({value: currentChange})
            return{
              "changeID": userChange.dataValues.ID,
              "pocketID": userChange.pocketID,
              "value": userChange.value,
              "userID":userChange.userID,
              "expiryDate": userChange.expiryDate,
            }
          }
        }
      }
      //SELECT `userID`,`pocketID`, SUM(`changeRedeemed`) as totalChangeRedeemed from `transactions` GROUP BY `userID`, `pocketID`;
      else {
        throw new ApolloError(`no change for this userID:${userID} and  pocketID:${pocketID}` );
      }
    },
  }
}
module.exports = resolvers