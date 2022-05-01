// 引用 express 與 Express 路由器
const express = require('express')
const passport = require('passport')
const router = express.Router()

// 使用者按下 facebook 可以觸發的按鈕
router.get('/facebook',passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))


router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 匯出路由器
module.exports = router