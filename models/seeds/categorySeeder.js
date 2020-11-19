const db = require('../../config/mongoose')
const Category = require('../category')

const SEED_CATEGORY = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
  return Promise.all(Array.from(
    { length: SEED_CATEGORY.length },
    (v, i) => Category.create({ name: SEED_CATEGORY[i] })
  ))
    .then(() => {
      console.log('categorySeeder done')
      process.exit()
    })
})