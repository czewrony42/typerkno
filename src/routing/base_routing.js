const router = require('express').Router()

const modelTypy = require('../models/typy')
const modelMecze = require('../models/mecze')
const czyWytypowal = require('../middleware/czyWytypowal')
const modelCzat = require('../models/czat')
const modelUser = require('../models/user')

const dataKonwerter = require('../util/dataFormater')

router.get('/', czyWytypowal, async (req, res) => {
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  const mecze = await modelMecze.getMecze(req.session.userId)
  res.render('index', { spotkania: mecze, czyWytypowal: req.session.wytypowal })
})

router.post('/typy', async (req, res) => {
  if (req.body.username === req.session.username) {
    const userId = req.session.userId
    // const username = req.session.username
    await modelTypy.saveTypy(req.body, userId)
    res.redirect("/")
  } else {
    res.send("co tam kombinujesz?")
  }
})

router.get('/regulamin', (req, res) => {
  res.locals.username = req.session.username
  res.render('regulamin')
})

router.get('/czat', async (req, res) => {
  res.locals.username = req.session.username
  const wiadomosci = await modelCzat.findAll({ limit: 100, order: [['data', "DESC"]] })
  res.render('czat', { wiadomosci: wiadomosci })
})

router.post('/czat', async (req, res) => {
  const { username, body } = req.body;
  const data = dataKonwerter(Date.now())
  try {
    await modelCzat.create({ username, body, data })
    res.redirect('/czat')
  } catch (error) {
    res.send("błąd dodawania wiadomośći!")
  }
})

//users

router.get('/users', async (req, res) => {
  try {
    res.locals.username = req.session.username
    res.locals.userId = req.session.userId
    const users = await modelUser.findAll()
    res.render('users', { users: users })
  } catch (error) {
    res.send("błąd")
  }
})

router.get('/users/:id',  async (req, res) => {
  const wynik = await modelUser.findOne({
    where: {id: req.params.id}
  })
  const a = req.session.username
  console.log(a);
  res.locals.userId = req.session.userId
  const mecze = await modelMecze.getMecze(req.params.id)
  res.render('usertyp', { spotkania: mecze, czyWytypowal: req.session.wytypowal, username: wynik })
})

module.exports = router