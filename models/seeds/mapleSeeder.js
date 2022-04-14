const mongoose = require('mongoose')
const maple = require('../maple')
const mapleList = require('../../maple.json').results

mongoose.connect('mongodb://localhost/game-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  maple.create(mapleList)
    .then(() => {
      // 運行創建資料庫內容
      console.log('maple mongodb connected!')
      db.close()
    })
    .catch(error => console.log(error))
})