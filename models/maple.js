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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // 參考哪一個項目這裡是參考 user.js 中的 user
    index: true, // 把 userId 當索引
    required: true // 必填欄位
  }
})

module.exports = mongoose.model('Maple', mapleSchema)