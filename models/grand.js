const mongoose = require('mongoose')
const Schema = mongoose.Schema
const grandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  info: {
    type: String
  }
})

module.exports = mongoose.model('Grand', grandSchema)