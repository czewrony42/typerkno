const modelTypy = require('../models/typy');

module.exports = async (req, res, next) => {
  try {
    const wynik = await modelTypy.findOne({
      where: {
        user_id: req.session.user.id
      }
    });
    req.session.user.wytypowal = (wynik && wynik.user_id >= 0) ? 1 : 0;
  } catch (error) {
    req.session.user.wytypowal = 0;
  }

  next();
};