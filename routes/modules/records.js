const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
// const category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => {
      res.render('new', { category })
    })
})

router.post('/', (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  return Record.create({ name, category, date, amount, merchant })
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then(category => {
      Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record, category }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name;
      record.category = category;
      record.date = date;
      record.amount = amount;
      record.merchant = merchant;
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router