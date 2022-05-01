// 引用 express 與 Express 路由器
const express = require('express') 
const router = express.Router()
// 引入 maples 模組程式碼
const maples = require('./modules/maples')
// 引入 grands 模組程式碼
const grands = require('./modules/grand')
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 users 模組程式碼
const users = require('./modules/users')
// 掛載 middleware 
const { authenticator } = require('../middleware/auth')
//
const auth = require('./modules/auth')


// 將網址結構符合 /mapleStorys 字串開頭的 request 導向 maples 模組
router.use('/mapleStorys', authenticator, maples)
// 將網址結構符合 /grandChases 字串開頭的 request 導向 grands 模組
router.use('/grandChases', authenticator, grands)
// 將網址結構符合 /users 字串開頭的 request 導向 users 模組
router.use('/users', users)
// facebook模組
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router