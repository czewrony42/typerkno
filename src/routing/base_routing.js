const router = require('express').Router()

const modelTypy = require('../models/typy')
const modelMecze = require('../models/mecze')
const czyWytypowal = require('../middleware/czyWytypowal')

router.get('/', czyWytypowal, async (req, res) => {
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  const mecz = await modelMecze.getMecze(req.session.userId)
  res.render('index', {spotkania: mecz, czyWytypowal: req.session.wytypowal})
})

router.post('/typy', async (req, res) => {
  if(req.body.username === req.session.username) {
    const userId = req.session.userId
    // const username = req.session.username
    await modelTypy.saveTypy(req.body, userId)
    // await saveTypy(req.body, req)
    res.send("Ok")
  } else {
    res.send("co tam kombinujesz?")
  }
})


module.exports = router