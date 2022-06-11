const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId }, // no auto since generated in SQL
    username: { type: mongoose.Schema.Types.String },
    pockets:  [mongoose.Schema.Types.ObjectId],
    favouriteBusiness: [mongoose.Schema.Types.ObjectId],
    emailAddress: { type: mongoose.Schema.Types.String }
  })
  
const user = mongoose.model('User', userSchema)

module.exports ={user}