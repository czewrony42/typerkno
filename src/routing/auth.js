const router = require('express').Router()
const userModel = require('../models/user')
const isNotAuth = require('../middleware/isNotAuth')

router.get('/login', isNotAuth, (req, res) => {
  res.render('login', {})
})

router.get('/register', isNotAuth, (req, res) => {
  res.render('register', {})
})

router.post('/login', isNotAuth, async (req, res) => {
  const {username, password} = req.body
  const user = await userModel.findOne({
    where: {username: username}
  })
  if (user && username === user.username && password === user.password) {
    req.session.user = {login: true, username: user.username, id: user.id}
    res.redirect('/')
  } else {
    res.render('login', {error: true})
  }
})

router.post('/register', isNotAuth, async (req, res) => {
  const { username, password, phone } = req.body
  const [user, created] = await userModel.findOrCreate({
    where: { username: username },
    defaults: {
      username: username,
      password: password,
      numer_telefonu: phone,
      aktywny: 0
    }
  })
  if(created) {
    req.session.user = {login: true, username: user.username, id: user.id}
    res.redirect('/')
  } else {
    res.render('register', {error: true})
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

module.exports = router