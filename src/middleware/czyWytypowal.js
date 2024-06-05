const modelTypy = require('../models/typy')

module.exports = async (req, res, next) => {
  const wynik = await modelTypy.findOne({
    where: {
      user_id: req.session.userId
    }
  })
  try {
    if (wynik.user_id >= 0) {
      req.session.wytypowal = 1
    }
  } catch (error) {
    req.session.wytypowal = 0
  }

  next()
}