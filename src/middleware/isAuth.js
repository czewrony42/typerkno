module.exports = (req, res, next) => {
  if ( req.session.user?.login) {
      return next();
  } else {
      res.redirect('/login');
  }
}