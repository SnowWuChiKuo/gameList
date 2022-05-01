// 載入 mongoose 模組
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

// 設定連線至 mongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


module.exports = db