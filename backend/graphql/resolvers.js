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
    user: async (parent, { userID }, { User }) => {
      if (userID === '') {
        return null;
      }
      const userInfo = await User.findOne({ where : {ID: userID}});
      if (userInfo) {
        return {
          "userID": userInfo.dataValues.ID
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
      const businessInfo = await Business.findOne({ where : {ID: busID}});
      if(businessInfo){
          return {
            "busID": businessInfo.dataValues.ID,
            "pocketID": businessInfo.dataValues.pocketID,
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
    loginUser: async (parent, { username, password }, { mongoUser, User}) => {
      const user = await mongoUser.findOne({ username })
      const userTable = await User.findOne({ID: user.userID})
      if (user){
        const validated = validate(password, user.password, userTable.dataValues.salt)
        if(validated){
          return user
        }
        else{
          throw new ApolloError(`password incorrect`);
        }
      }
      else {
        throw new ApolloError(`username:${username} doesn't exist`);
      }
    },
    loginBus: async (parent, { busname, password }, { mongoBusiness, Business}) => {
      const bus = await mongoBusiness.findOne({ busname })
      const busTable = await Business.findOne({ID: bus.userID})
      if (bus){
        const validated = validate(password, bus.password, busTable.dataValues.salt)
        if(validated){
          return bus
        }
        else{
          throw new ApolloError(`password incorrect`);
        }
      }
      else {
        throw new ApolloError(`business username:${busname} doesn't exist`);
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
    }
  }
}
module.exports = resolvers