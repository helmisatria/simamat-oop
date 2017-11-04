/**
* DataController
*
* @description :: Server-side logic for managing data
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	default: (req, res) => {

		// NAVIGASI
		const navigasiStafGudang = require('../../navigasi/staf_gudang')
		const navigasiAdmin = require('../../navigasi/admin')
		const navigasiManajer = require('../../navigasi/manajer')
		const navigasiBendahara = require('../../navigasi/bendahara')
		const navigasiKasir = require('../../navigasi/kasir')

		// TABLE ROW
		const tableRowAdmin = require('../../dashboard/tablerow/admin')
		const tableRowStafGudang = require('../../dashboard/tablerow/staf_gudang')
		const tableRowAdminKelolaRole = require('../../dashboard/tablerow/adminKelolaRole')
		const tableRowManajer = require('../../dashboard/tablerow/manajer')
		const tableRowKasir = require('../../dashboard/tablerow/kasir_pembelian_barang')

		// DATA CONTENT
		const dataContentAdmin = require('../../dataContent/admin')
		const dataContentAdminKelolaRole = require('../../dataContent/adminKelolaRole')
		const dataContentStafGudang = require('../../dataContent/staf_gudang')
		const dataContentManajer = require('../../dataContent/manajer')
		const dataContentKasir = require('../../dataContent/kasir_pembelian_barang')

		const { user } = req.session
		let navigasi
		let dataTR
		let collection
		let dataContent
		let userModel

		if (user.role === 'Staf Gudang') {
			navigasi = navigasiStafGudang
			dataTR = tableRowStafGudang
			dataContent = dataContentStafGudang

			collection = 'barang'
			dataModel = Barang
			userModel = StafGudang
		} else if (user.role === 'Admin') {
			navigasi = navigasiAdmin
			dataTR = tableRowAdmin
			dataContent = dataContentAdmin
			collection = 'user'
			dataModel = User
			userModel = Admin
			navigasi[2].href = '/kelola_role'
		} else if (user.role === 'Manajer') {
			navigasi = navigasiManajer
			dataTR = tableRowManajer
			dataContent = dataContentManajer
			collection = 'barang'
			dataModel = Barang
			userModel = Manajer
		}  else if (user.role === 'Kasir') {
			navigasi = navigasiKasir
			dataTR = tableRowKasir
			dataContent = dataContentKasir
			collection = 'barang'
			dataModel = Barang
			userModel = Kasir
		}
		navigasi[0].href = '/dashboard'
		navigasi[1].href = '#'
		navigasi[0].class = ''
		navigasi[1].class = 'active-collection'
		navigasi[2].class = ''

		dataModel.find({
			where: {
				username: {
					$ne: 'admin'
				}
			},
			sort: 'id DESC'
		})
		.exec(function(err, data) {
			res.view('users/data',
			{
				navigasi,
				user: req.session.user,
				data,
				dataTR,
				dataContent,
				collection
			})
		})
	}
}
