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
  * `AdminController.kelolarole()`
  */
  kelolaRole: function (req, res) {
    const { body } = req
    
    User.update({
      id: body.id
    }, {
      role: body.role
    })
    .then((result) => {
      if (result) return res.status(200).send()
      res.status(400).send('Something wrong!')
    })
    .catch((e) => {
      res.status(400).send(e)
    })
  },

  kelolaPassword: (req, res) => {
    const { data } = req.body

    console.log({data});
    
    if (data[0].value == 'admin') {
      return res.status(400).send('Username user tidak valid')
    }
    
    User.findOne({ username: data[0].value })
      .then((user) => {        
        if (!user) {
          return res.status(400).send('Username user tidak valid')
        }
        
        User.update({ username: data[0].value }, {
          password: data[1].value
        })
          .then((user) => {
            res.status(200).send('Password Berhasil Diperbarui')
          })
          .catch(() => {
            res.status(400).send('Password Gagal Diperbarui')
          })
        
      })
      .catch((err) => {
        res.status(400).send('Username user tidak valid')
      })    
  },

  getUsername: (req, res) => {
    User.find({
      where :{
        username:{
          $ne: 'admin'
        }
      }
    }, { select: ['username'] })
      .then((result) => {
        return res.status(200).send(result)
      })
      .catch((err) => {
        return res.status(400).send(err)
      })
  },

  /**
  * `AdminController.halamanKelolaRole`
  */
  halamanKelolaRole: (req, res) => {
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
    navigasi[3].href = '#'
    navigasi[0].class = ''
    navigasi[1].class = ''
    navigasi[2].class = 'active-collection'
    navigasi[3].class = ''

    User.find({
      where :{
        username:{
          $ne: 'admin'
        }
      },
      sort: 'id DESC'
    })
    .exec(function(err,data) {
      console.log(data);
      
      res.view('users/KelolaRoleView', {
        user,
        navigasi,
        dataTR,
        dataContent,
        data
      })
    })
  }
  };
