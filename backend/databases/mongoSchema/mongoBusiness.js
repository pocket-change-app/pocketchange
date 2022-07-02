const mongoose = require('mongoose')

const mongoBusinessSchema = new mongoose.Schema({
    busID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    password: { type: mongoose.Schema.Types.String },
    role: { type: mongoose.Schema.Types.String },
    busname: { type: mongoose.Schema.Types.String },
    dateEstablished: { type: mongoose.Schema.Types.Date },
    pocketID: {type: mongoose.Schema.Types.String},
    emailAddress: { type: mongoose.Schema.Types.String },
  })
  
const mongoBusiness = mongoose.model('mongoBusiness', mongoBusinessSchema)

module.exports ={mongoBusiness}
