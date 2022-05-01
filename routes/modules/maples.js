// 引用 express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Maple model
const Maple = require('../../models/maple')

// 瀏覽 MapleStory 新增頁面
router.get('/new', (req, res) => {
  return res.render('newM')
})
// 將新增內容放入 瀏覽 MapleStory 頁面 
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, url, info } = req.body
  return Maple.create({ name, url, info, userId })
    .then(() => res.redirect('/MapleStory'))
    .catch(error => console.log(error))
})
// 進入瀏覽頁觀看細部內容
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Maple.findOne({ _id,userId })
    .lean()
    .then((maple) => res.render('detailM', { maple }))
    .catch(error => console.log(error))
})
// 進入編輯頁
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Maple.findOne({ _id, userId })
    .lean()
    .then((maple) => res.render('editM', { maple }))
    .catch(error => console.log(error))
})
// 修改編輯內容
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const body = req.body

  return Maple.findOne({ _id, userId })
    .then(maples => {
      maples.name = body.name
      maples.url = body.url
      maples.info = body.info
      return maples.save()
    })
    .then(() => res.redirect(`/mapleStorys/${_id}`))
    .catch(error => console.log(error))
})
// 刪除此內容
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Maple.findOne({ _id, userId })
    .then(maple => maple.remove())
    .then(() => res.redirect('/mapleStory'))
    .catch(error => console.log(error))
})

module.exports = router