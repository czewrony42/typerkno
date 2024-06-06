module.exports = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/'); // Przekierowanie na stronę główną lub inną stronę po zalogowaniu
  } else {
    next();
  }
};