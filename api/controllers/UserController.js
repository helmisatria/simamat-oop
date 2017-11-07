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
			return res.ok('Logged out succesfully!')
		}

		return res.view('users/LoginView')
	},

	getDataUser: (req, res) => {
		const { body } = req

	  User.findOne({ id: body.id })
			.then((result) => {
				if (result) {
					return res.status(200).send(result)
				} else {
					return res.status(400).send('Tidak Ditemukan')
				}
			})
			.catch((e) => {
				return res.status(400).send({ responseText: e })
			})
	},

	getCountDataUser: (req, res) => {
		const data = []

	  User.count({
			username: {
				$ne: 'admin'
			}
		})
	  .then((result) => {
	    data.push(result)
	    res.status(200).send({ data })
	  })
	  .catch((e) => {
	    res.status(400).send(e)
	  })
	}
};
