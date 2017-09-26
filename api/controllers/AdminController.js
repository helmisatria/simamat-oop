/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `AdminController.createuser()`
   */
  createuser: function (req, res) {
		const { body } = req

    User.findOne({ username: body.username }, (err, result) => {
      if (result) {
				return res.status(400).send({ responseText: 'Username Tidak Tersedia' })
			}
      User.create(body)
      .then((insertResult) => {
        if (insertResult) res.status(200).send({ responseText: 'Tambah User Baru Berhasil' })
      })
    })
  },


  /**
   * `AdminController.updateuser()`
   */
  updateuser: function (req, res) {
		const { body } = req

	  const { fieldCount } = req.params

	  for (let i = 0; i < fieldCount; i++) {
	    User.update({ id: body.id }, {
				[body['data'][i]['name']]: body['data'][i]['value']
	    })
	    .catch((e) => {
	      return res.status(400).send()
	    })
	  }
	  return res.status(200).send('Data User Berhasil Diperbarui')
  },

  /**
   * `AdminController.deleteuser()`
   */
  deleteuser: function (req, res) {
		const { body } = req

	  User.destroy({ id: body.id })
    .then((result) => {
      if (result) return res.status(200).send(result)
      res.status(400).send('Barang Tidak Ditemukan')
    })
    .catch((e) => {
      res.status(400).send(e)
    })
  },

  /**
   * `AdminController.getuser()`
   */
  getuser: function (req, res) {
    return res.json({
      todo: 'getuser() is not implemented yet!'
    });
  },

  /**
   * `AdminController.kelolarole()`
   */
  kelolarole: function (req, res) {
    return res.json({
      todo: 'kelolarole() is not implemented yet!'
    });
  }
};
