const mongoose = require('mongoose')

const mongoBusinessSchema = new mongoose.Schema({
    businessID: { type: mongoose.Schema.Types.String }, // no auto since generated in SQL
    businessName:  { type: mongoose.Schema.Types.String }, 
    dateEstablished: { type: mongoose.Schema.Types.Date },
    emailAddress: { type: mongoose.Schema.Types.String },
    phoneNumber: { type: mongoose.Schema.Types.String },
    website:  {type: mongoose.Schema.Types.String },
    businessType:  {type: mongoose.Schema.Types.String }, //restaurant, clothing
    businessSubtype:  {type: mongoose.Schema.Types.String },//cafe, kids clothing
  })
  
const mongoBusiness = mongoose.model('mongoBusiness', mongoBusinessSchema)

module.exports ={mongoBusiness}