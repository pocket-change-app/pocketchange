const mongoose = require('mongoose')

const mongoPocketMangerSchema = new mongoose.Schema({
    managerID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    password: { type: mongoose.Schema.Types.String },
    name: { type: mongoose.Schema.Types.String },
    managername :  { type: mongoose.Schema.Types.String },
    pocketID: {type: mongoose.Schema.Types.String},
    emailAddress: { type: mongoose.Schema.Types.String },
  })
  
const mongoPocketManager = mongoose.model('mongoPocketManager', mongoPocketMangerSchema)

module.exports ={mongoPocketManager}
