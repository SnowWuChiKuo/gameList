const mongoose = require('mongoose')
const grand = require('../grand')
const grandList = require('../../grand.json').results

mongoose.connect('mongodb://localhost/game-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  grand.create(grandList)
    .then(() => {
      console.log('grand mongodb connected!')
      db.close()
    })
    .catch(error => console.log(error))
})