const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mapleSchema = new Schema({
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

module.exports = mongoose.model('Maple', mapleSchema)