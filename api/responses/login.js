module.exports = function login(inputs) {
  inputs = inputs || {}

  const req = this.req
  const res = this.res

  User.attemptLogin({
    username: inputs.username,
    password: inputs.password
  }, (err, user) => {
    /**
     * IF USER NOT FOUND OR ERROR
     * @param  {error} err NOT NULL if error happened
     * @param  {user} user NOT NULL if USER FOUND
     */
    if (err) return res.negotiate(err)
    if (!user) {
      if (req.wantsJSON) {
        return res.badRequest('Invalid username/password combination.')
      }
      return res.redirect(inputs.invalidRedirect)
    }

    /**
     * IF USER FOUND
     */
    req.session.user = user
    if (req.wantsJSON) return res.ok(user)

    return res.redirect(inputs.successRedirect)
  })
};
