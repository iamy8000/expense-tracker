const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

router.get('/', (req, res) => {
  let totalAmount = 0
  let category = ''

  function generateCategory() {
    Category.find()
      .lean()
      .then(item => {
        category = item
      })
      .catch(error => console.log(error))
  }

  if (req.query.filter) { //有篩選
    generateCategory()
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(items => {
        const records = []
        items.forEach(item => {
          if (item.category === req.query.filter)
            records.push(item)
        })
        records.forEach(item => {
          totalAmount = totalAmount + item.amount
        })
        res.render('index', { records, totalAmount, category })
      })

  } else { //無篩選
    generateCategory()
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        records.forEach(record => { //顯示總金額
          totalAmount = totalAmount + record.amount
        })
        res.render('index', { records, totalAmount, category })
      })
      .catch(error => console.error(error))
  }

})

module.exports = router