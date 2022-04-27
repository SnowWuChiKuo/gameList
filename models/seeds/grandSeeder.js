const db = require('../../config/mongoose')
const grand = require('../grand')
const grandList = require('../../grand.json').results

// 連線成功
db.once('open', () => {
  grand.create(grandList)
    .then(() => {
      console.log('grand mongodb connected!')
      db.close()
    })
    .catch(error => console.log(error))
})