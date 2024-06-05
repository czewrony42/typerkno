const router = require('express').Router()
const userModel = require('../models/user')

const prevent = (req, res, next) => {
  if (req.session.login) {
    res.redirect('/')
  } else {
    next()
  }
}
router.get('/login', prevent, (req, res) => {
  res.render('login', {})
})

router.get('/register', prevent, (req, res) => {
  res.render('register', {})
})

router.post('/login', prevent, async (req, res) => {
  const {username, password} = req.body
  const user = await userModel.findOne({
    where: {username: username}
  })
  if (user && username === user.username && password === user.password) {
    req.session.login = true
    req.session.username = user.username
    req.session.userId = user.id
    
    res.redirect('/')
  } else {
    res.render('login', {error: true})
  }
})

router.post('/register', prevent, async (req, res) => {
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
    req.session.login = true
    req.session.username = user.username
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