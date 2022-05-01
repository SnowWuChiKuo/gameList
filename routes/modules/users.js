// 引用 express 與 Express 路由器
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 瀏覽登入畫面
router.get('/login', (req, res) => {
  res.render('login')
})
// 登入畫面資料傳輸
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// 瀏覽註冊畫面
router.get('/register', (req, res) => {
  res.render('register')
})
// 註冊畫面資料傳輸
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一致!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了!' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10) // 產生[鹽]，並設定複雜係數為10
        .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼[加鹽]，產生雜湊值
        .then(hash => User.create({
          name,
          email,
          password
        }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出!')
  res.redirect('/users/login')
})


module.exports = router