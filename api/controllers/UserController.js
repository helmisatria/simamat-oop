/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: (req, res) => {
		return res.login({
			username: req.param('username'),
			password: req.param('password'),
			successRedirect: '/dashboard',
			invalidRedirect: '/login'
		})
	},
	logout: (req, res) => {
		req.session.user = null

		if (req.wantsJSON) {
			res.ok('Logged out succesfully!')
		}

		res.redirect('/')
	}
};
