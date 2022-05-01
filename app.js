// 載入 express 模組
const express = require('express')
// 載入 session 模組
const session = require('express-session')
// 載入 handlebars 模組
const exphbs = require('express-handlebars')
// 載入 body-parser 模組
const bodyParser = require('body-parser')
// 載入 method-override 模組
const methodOverride = require('method-override')
// 載入 connect-flash 模組
const flash = require('connect-flash')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 引用路由器
const routes = require('./routes')
// 引用 mongoose 模組
require('./config/mongoose')

const app = express()
// 建立 port 號
const port = 3000

// 使用樣板引擎 (第一個參數是樣板引擎名稱，第二個參數是放入此樣板引擎的相關設定)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
// 透過 app.set 告訴Express要設定
app.set('view engine', 'hbs')
// 設定 session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 設定bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// 設定 method-override
app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app 這條要寫在路由之前
usePassport(app)
// 掛載套件 flash
app.use(flash()) 
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// 將 request 導入路由器
app.use(routes)


app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})