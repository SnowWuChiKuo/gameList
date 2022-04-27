const db = require('../../config/mongoose')
const maple = require('../maple')
const mapleList = require('../../maple.json').results

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