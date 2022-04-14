// 載入 express 模組
const express = require('express')
// 載入 handlebars 模組
const exphbs = require('express-handlebars')
// 載入 body-parser 模組
const bodyParser = require('body-parser')
// 載入 mongoose 模組
const mongoose = require('mongoose')
// 載入 models/maple.js 模組
const Maple = require('./models/maple')
// 載入 models/grand.js 模組
const Grand = require('./models/grand')

// 設定連線至 mongoDB
mongoose.connect('mongodb://localhost/game-list', { useNewUrlParser: true, useUnifiedTopology: true })

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


const app = express()
// 建立 port 號
const port = 3000

// 使用樣板引擎 (第一個參數是樣板引擎名稱，第二個參數是放入此樣板引擎的相關設定)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
// 透過 app.set 告訴Express要設定
app.set('view engine', 'hbs')
// 設定bodyParser
app.set(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/MapleStory', (req, res) => {
  Maple.find()  // 取出 Todo model 裡的所有資料
    .lean()   // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(maples => res.render('maple', { maples }))   // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

app.get('/GrandChase', (req, res) => {
  Grand.find()
    .lean()
    .then(grands => res.render('grand', { grands }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})