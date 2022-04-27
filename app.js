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
// 載入 method-override 模組
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')


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
app.use(bodyParser.urlencoded({ extended: true }))
// 設定 method-override
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)


app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})