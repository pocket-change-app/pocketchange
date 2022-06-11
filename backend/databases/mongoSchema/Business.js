const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    busID: { type: mongoose.Schema.Types.ObjectId }, // no auto since generated in SQL
    role: { type: mongoose.Schema.Types.String },
    busname: { type: mongoose.Schema.Types.String },
    pocket: {type: mongoose.Schema.Types.ObjectId},
    emailAddress: { type: mongoose.Schema.Types.String },
  })
  
const business = mongoose.model('Business', businessSchema)

module.exports ={business}