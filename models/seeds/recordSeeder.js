const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

const SEED_RECORD = [{
  name: '小農拿鐵',
  category: '餐飲食品',
  date: Date.now(),
  amount: 100,
  merchant: '路易莎'
}, {
  name: '紅茶拿鐵',
  category: '餐飲食品',
  date: Date.now(),
  amount: 90,
  merchant: '路易莎'
}]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: SEED_RECORD.length },
        (v, i) => Record.create({
          name: SEED_RECORD[i].name,
          category: SEED_RECORD[i].category,
          date: SEED_RECORD[i].date,
          amount: SEED_RECORD[i].amount,
          merchant: SEED_RECORD[i].merchant,
          userId
        })
      ))
        .then(() => {
          console.log('recordSeeder done')
          process.exit()
        })
    })
})