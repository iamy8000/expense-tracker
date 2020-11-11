const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  let totalAmount = 0
  let category = ''

  Category.find()
    .lean()
    .then(item => {
      category = item
    })
    .catch(error => console.log(error))

  return Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => { //顯示總金額
      records.forEach(record => {
        totalAmount = totalAmount + record.amount
      })
      res.render('index', { records, totalAmount, category })
    })
    .catch(error => console.error(error))


})

// router.get('/', (req, res) => {
//   Record.find()
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => {
//       res.render('index', { records })
//     })
//     .catch(error => console.error(error))
// })

module.exports = router