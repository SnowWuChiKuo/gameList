// 引用 express 與 Express 路由器
const express = require('express')
const grand = require('../../models/grand')
const router = express.Router()
// 引用 Maple model
const Grand = require('../../models/grand')

// 瀏覽 GrandChase 新增頁面
router.get('/new', (req, res) => {
  return res.render('newG')
})
// 將新增內容放入 瀏覽 GrandChase 頁面
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, url, info } = req.body
  return Grand.create({ name, url, info, userId })
    .then(() => res.redirect('/GrandChase'))
    .catch(error => console.log(error))
})
// 進入瀏覽頁觀看細部內容
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Grand.findOne({ _id, userId })
    .lean()
    .then((grand) => res.render('detailG', {grand}))
    .catch(error => console.log(error))
})
// 進入編輯頁
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Grand.findOne({ _id, userId })
    .lean()
    .then((grand) => res.render('editG', { grand }))
    .catch(error => console.log(error))
})
// 修改編輯內容
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const body = req.body

  return Grand.findOne({ _id, userId })
    .then(grand => {
      grand.name = body.name
      grand.url = body.url
      grand.info = body.info
      return grand.save()
    })
    .then(() => res.redirect(`/grandChases/${_id}`))
    .catch(error => console.log(error))
})
// 刪除此內容
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Grand.findOne({ _id, userId })
    .then(grand => grand.remove())
    .then(() => res.redirect('/grandChase'))
    .catch(error => console.log(error))
})

module.exports = router









module.exports = router