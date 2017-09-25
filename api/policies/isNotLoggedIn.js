/**
 * isNotLoggedIn
 *
 * @module      :: Policy
 * @description :: Policy to disallow authenticated user for access /login routes
 *
 */
module.exports = function(req, res, next) {
  if (!req.session.user) {
    return next()
  }

  return res.redirect('/dashboard')
};
