const R  = require('ramda')
const crypto = require('crypto')

//validate pasword
module.exports = validate = (userpass, hashedpass, salt) => {
    let hash = crypto.createHmac("sha512", salt);
    hash.update(userpass);
    userpass = hash.digest("hex");
    return userpass == hashedpass;
  };
  