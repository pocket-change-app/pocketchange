const mongoose = require('mongoose')

const mongoPocketSchema = new mongoose.Schema({
    pocketID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    pocketname: { type: mongoose.Schema.Types.String },
    pocketManager: { type: mongoose.Schema.Types.String },
    businesses: [mongoose.Schema.Types.String],
    customers: [mongoose.Schema.Types.String]
    //georegion?
  })
  
  const mongoPocket = mongoose.model('mongoPocket', mongoPocketSchema)

  module.exports ={mongoPocket}
