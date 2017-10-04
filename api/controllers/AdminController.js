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
  kelolaRole: function (req, res) {
    const { body } = req
    console.log(body);
    User.findOneAndUpdate({
      _id: ObjectId(body.id)
    }, {
      $set: {
        role: body.role
      }
    })
    .then((result) => {
      console.log(result);
      if (result) return res.status(200).send()
      res.status(400).send('Something wrong!')
    })
    .catch((e) => {
      res.status(400).send(e)
    })
  },

  /**
  * `AdminController.halamanKelolaRole`
  */
  halamanKelolaRole: (req, res) => {
    const handlebars = require('handlebars');
    handlebars.registerHelper('ifCond', function (v1, v2, options) {
      if (v1 === v2) return options.fn(this)
      return options.inverse(this)
    })
    const navigasiAdmin = require('../../navigasi/admin')
    const tableRowAdminKelolaRole = require('../../dashboard/tablerow/adminKelolaRole')
    const dataContentAdminKelolaRole = require('../../dataContent/adminKelolaRole')
    const { user } = req.session
    const navigasi = navigasiAdmin
    const dataTR = tableRowAdminKelolaRole
    const dataContent = dataContentAdminKelolaRole

    navigasi[0].href = '/dashboard'
    navigasi[1].href = '/data'
    navigasi[2].href = '#'
    navigasi[0].class = ''
    navigasi[1].class = ''
    navigasi[2].class = 'active-collection'

    User.find({
      where :{
        username:{
          $ne: 'admin'
        }
      },
      sort: 'id DESC'
    })
    .exec(function(err,data) {
      res.view('users/kelola_role', {
        user,
        navigasi,
        dataTR,
        dataContent,
        data
      })
    })
  }
  };
