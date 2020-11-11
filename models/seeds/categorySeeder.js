const db = require('../../config/mongoose')
const Category = require('../category')

const categorySeed = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
  categorySeed.forEach(category => {
    Category.create({
      name: category
    })
  })
  console.log('categorySeeder done')
})