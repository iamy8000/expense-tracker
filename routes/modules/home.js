const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

router.get('/', (req, res) => {
  const month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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

  if (req.query.categoryFilter) { //類別篩選
    generateCategory()
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(items => {
        const records = [] //處理category篩選
        items.forEach(item => {
          if (item.category === req.query.categoryFilter)
            records.push(item)
        })
        records.forEach(item => {
          totalAmount = totalAmount + item.amount //顯示總金額
          let isoDate = item.date //處理時間格式
          item.date = moment(isoDate).format('YYYY-MM-DD')
        })
        res.render('index', { records, totalAmount, category, month })
      })
  }

  else if (req.query.monthFilter) { //月份篩選
    generateCategory()
    const monthFilter = Number(req.query.monthFilter)
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(items => {
        const records = [] //處理月份篩選
        items.forEach(item => {
          let isoMonth = Number(moment(item.date).format('MM'))
          if (isoMonth === monthFilter) {
            records.push(item)
          }
        })
        records.forEach(item => {
          totalAmount = totalAmount + item.amount //顯示總金額
          let isoDate = item.date //處理時間格式
          item.date = moment(isoDate).format('YYYY-MM-DD')
        })
        res.render('index', { records, totalAmount, category, month })
      })
  }

  else { //無篩選
    generateCategory()
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(records => {

        records.forEach(record => {
          totalAmount = totalAmount + record.amount //顯示總金額
          let isoDate = record.date //處理時間格式
          record.date = moment(isoDate).format("YYYY-MM-DD")
        })

        res.render('index', { records, totalAmount, category, month })
      })
      .catch(error => console.error(error))
  }

})

module.exports = router