const R  = require('ramda')
const crypto = require('crypto')

//obfuscate pasword
module.exports = obfuscate = (pass) => {
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