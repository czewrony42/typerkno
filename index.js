const express = require('express')
const session = require('express-session')
require('dotenv').config();
const isAuth = require('./src/middleware/isAuth')

const baseRouting = require('./src/routing/base')
const auth_routing = require('./src/routing/auth')


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: "wronskibosscokkiessztos",
  cookie: {
    secure: false
  }
}))

app.use(express.urlencoded({ extended: true }))

app.use('/', auth_routing)
app.use('/', isAuth, baseRouting)


//Server start
if (process.env.ENV === 'dev') {
  app.listen(3000, () => {
    console.log("serwer działa na: http://localhost:3000");
  })
} else {
  app.listen(process.env.PORT, () => {
    console.log(`serwer działa na: https://frog01.mikr.us:${process.env.PORT}`);
  })
}