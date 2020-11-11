const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

let totalAmount = 0

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => {
        totalAmount = totalAmount + record.amount
      })
      res.render('index', { records, totalAmount })
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