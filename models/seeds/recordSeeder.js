const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connect!')
  for (let i = 0; i < 5; i++) {
    Record.create({
      name: 'name' + i,
      category: 'category' + i,
      date: i,
      amount: i
    })
  }
})