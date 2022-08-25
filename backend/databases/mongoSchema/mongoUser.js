const mongoose = require('mongoose')

const mongoUserSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    username: { type: mongoose.Schema.Types.String },
    name: { type: mongoose.Schema.Types.String },
    birthDate: { type: mongoose.Schema.Types.Date },
    password: { type: mongoose.Schema.Types.String },
    totalChange: { type: mongoose.Schema.Types.Decimal128 },
    emailAddress: { type: mongoose.Schema.Types.String },
    home: {type: mongoose.Schema.Types.String},
    deactivated:{type:mongoose.Schema.Types.Boolean} //if the user is still active
  })
  
const mongoUser = mongoose.model('mongoUser', mongoUserSchema)

module.exports ={mongoUser}

