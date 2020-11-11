const Record = require('../record')
const db = require('../../config/mongoose')

const recordsSeed = [{
  name: '路易莎1',
  category: '飲品',
  date: Date.now(),
  amount: 100
}, {
  name: '路易莎2',
  category: '咖啡',
  date: Date.now(),
  amount: 90
}]

db.once('open', () => {
  recordsSeed.forEach(record => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  })
  console.log('recordSeeder done')
})