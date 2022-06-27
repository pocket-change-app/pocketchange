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

// (C) TEST ENCRYPT
// Save BOTH the password and salt into database or file
const clearpass = "He110Wor!d";
const obfuscated = obfuscate(clearpass);
console.log("===== HASHED PASSWORD + SALT =====");
console.log(obfuscated);

// (D) VALIDATE PASSWORD
const validate = (userpass, hashedpass, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(userpass);
  userpass = hash.digest("hex");
  return userpass == hashedpass;
};

// (E) TEST VALIDATE
// clearpass = "FOOBAR";
const validated = validate(clearpass, obfuscated.hash, obfuscated.salt);
console.log("===== VALIDATION =====");
console.log("Clear password: " + clearpass);
console.log("Validation status: " + validated);


const resolvers = {
  Query:{
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
    },
    loginUser: async (parent, { username, password }, { mongoUser, User}) => {
      console.log("UNHASHED", password)
      const user = await mongoUser.findOne({ username })
      console.log("HASHED", user.password)
      const userTable = await User.findOne({id: user.userID})
      if (user){
        const validated = validate(password, user.password, userTable.dataValues.salt)
        console.log(validated)
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
  },
  Mutation: {
    registerUser: async (parent, { username, password }, { User, mongoUser }) => {
      const encryptpass = obfuscate(password);
      const existing = await mongoUser.findOne({ username })
      if (!existing) {
        const newUser = new mongoUser({ username})
        const { _id } = await newUser.save()
        newUser.userID = _id
        newUser.password = encryptpass.hash
        await newUser.save()
        await User.create({ id: _id, salt: encryptpass.salt});
        return newUser
      } else {
        throw new ApolloError('User already exists')
      }
  }
  }
}
module.exports = resolvers