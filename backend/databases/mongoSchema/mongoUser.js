const mongoose = require('mongoose')

const mongoUserSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId }, // no auto since generated in SQL
    username: { type: mongoose.Schema.Types.String },
    password: { type: mongoose.Schema.Types.String },
    pockets:  [mongoose.Schema.Types.ObjectId],
    favouriteBusiness: [mongoose.Schema.Types.ObjectId],
    emailAddress: { type: mongoose.Schema.Types.String }
  })
  
const mongoUser = mongoose.model('mongoUser', mongoUserSchema)

module.exports ={mongoUser}