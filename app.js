const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const moment = require('moment')
const session = require('express-session')

const router = require('./routes')
const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)
app.use(router)

app.listen(3000, () => {
  console.log('App is running on http://localhost: 3000')
})