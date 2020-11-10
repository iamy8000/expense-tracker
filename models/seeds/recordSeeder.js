const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 5; i++) {
    Record.create({
      name: 'name' + i,
      category: 'category' + i,
      date: i,
      amount: i
    })
  }
  console.log('recordSeeder done')
})