// 引用 express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Maple model
const Maple = require('../../models/maple')
// 引用 Grand model
const Grand = require('../../models/grand')
// 定義首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

// 瀏覽 MapleStory 頁面 && 定義 maple 首頁路由
router.get('/MapleStory', (req, res) => {
  Maple.find()  // 取出 Todo model 裡的所有資料
    .lean()   // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(maples => res.render('maple', { maples }))   // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})
// 瀏覽 GrandChase 頁面 && 定義 grand 首頁路由
router.get('/GrandChase', (req, res) => {
  Grand.find()
    .lean()
    .then(grands => res.render('grand', { grands }))
    .catch(error => console.log(error))
})


// 匯出路由器
module.exports = router