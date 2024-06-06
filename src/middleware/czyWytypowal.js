const modelTypy = require('../models/typy');

module.exports = async (req, res, next) => {
  if (req.path === '/') {
    try {
      const wynik = await modelTypy.findOne({
        where: {
          user_id: req.session.userId
        }
      });

      req.session.wytypowal = wynik && wynik.user_id >= 0 ? 1 : 0;
    } catch (error) {
      req.session.wytypowal = 0;
    }
  }

  next();
};