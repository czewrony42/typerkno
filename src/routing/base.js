const router = require('express').Router()

const modelTypy = require('../models/typy')
const modelMecze = require('../models/mecze')
const modelCzat = require('../models/czat')
const modelUser = require('../models/user')

const czyWytypowalMiddleware = require('../middleware/czyWytypowal')

const dataKonwerter = require('../util/dataFormater')

router.get('/', async (req, res) => {
  const czat_wiadomosci = await modelCzat.findAll({ limit: 25, order: [['data', "DESC"]] })
  res.render('index', { czat: czat_wiadomosci, user: req.session.user })
})

router.get('/moje-typy', czyWytypowalMiddleware, async (req, res) => {
  const mecze = await modelMecze.getMecze(req.session.user.id)
  res.render('moje-typy', { user: req.session.user, spotkania: mecze })
})

router.post('/moje-typy', czyWytypowalMiddleware, async (req, res) => {
  if (req.body.username === req.session.user.username) {
    await modelTypy.saveTypy(req.body, req.session.user.id)
    res.redirect("/moje-typy")
  } else {
    res.send("co tam kombinujesz?")
  }
})

router.get('/regulamin', (req, res) => {
  res.render('regulamin')
})


router.post('/czat', async (req, res) => {
  const { username, body } = req.body;
  console.log(req.body);
  const data = dataKonwerter(Date.now())
  try {
    if (body.length > 1000) {
      res.redirect('/')
    } else {
      await modelCzat.create({ username, body, data })
      res.redirect('/')
    }
  } catch (error) {
    res.send("błąd dodawania wiadomości")
  }
})


router.get('/typy', async (req, res) => {
  try {
    const users = await modelUser.findAll()
    res.render('typy-uzytkownikow', { users: users })
  } catch (error) {
    res.send("błąd")
  }
})

router.get('/typy/:id', async (req, res) => {
  const username = await modelUser.findOne({
    where: {id: req.params.id}
  })
  const wytypowal = await modelTypy.findOne({
    where: {
      user_id: req.params.id
    }
  });
  const wytypowal_wynik = (wytypowal && wytypowal.user_id >= 0) ? 1 : 0;
  const mecze = await modelMecze.getMecze(req.params.id)
  res.render('typy-uzytkownika-gotowe', { spotkania: mecze, czyWytypowal: wytypowal_wynik, nazwa: username})
})

module.exports = router