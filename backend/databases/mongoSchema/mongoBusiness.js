const mongoose = require('mongoose')

const mongoBusinessSchema = new mongoose.Schema({
    busID: { type: mongoose.Schema.Types.ObjectId }, // no auto since generated in SQL
    password: { type: mongoose.Schema.Types.String },
    role: { type: mongoose.Schema.Types.String },
    busname: { type: mongoose.Schema.Types.String },
    pocket: {type: mongoose.Schema.Types.ObjectId},
    emailAddress: { type: mongoose.Schema.Types.String },
  })
  
const mongoBusiness = mongoose.model('mongoBusiness', mongoBusinessSchema)

module.exports ={mongoBusiness}
