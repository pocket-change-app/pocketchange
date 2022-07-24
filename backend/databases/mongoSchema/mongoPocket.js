const mongoose = require('mongoose')

const mongoPocketSchema = new mongoose.Schema({
    pocketID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    pocketName: { type: mongoose.Schema.Types.String },
    region: {type: mongoose.Schema.Types.String}, //Toronto for now
    //georegion?
  })
  
  const mongoPocket = mongoose.model('mongoPocket', mongoPocketSchema)

  module.exports ={mongoPocket}
