/**
* BarangController
*
* @description :: Server-side logic for managing barangs
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	getIdBarang: (req, res) => {
		Barang.find({})
		.exec((err, result) => {
			if (!result) return res.status(400).send()
			return res.status(200).send(result)
		})
	},
	getDataBarang : (req,res) => {
		const { user } = req.session
		let navigasi
		let dataTR
		let collection
		let dataContent

		if (user.role === 'Staf Gudang') {
			navigasi = navigasiStafGudang
			dataTR = tableRowStafGudang
			dataContent = dataContentStafGudang
			collection = 'barang'
		} else if (user.role === 'Admin') {
			navigasi = navigasiAdmin
			dataTR = tableRowAdmin
			dataContent = dataContentAdmin
			collection = 'user'
			navigasi[2].href = '/kelola_role'
		} else if (user.role === 'Manajer') {
			navigasi = navigasiManajer
			dataTR = tableRowManajer
			dataContent = dataContentManajer
			collection = 'barang'
		} else if (user.role === 'Kasir') {
			navigasi = navigasiKasir
			dataTR = tableRowKasir
			dataContent = dataContentManajer
			collection = 'barang'
		}

		navigasi[0].href = '/dashboard'
		navigasi[1].href = '#'
		navigasi[0].class = ''
		navigasi[1].class = 'active-collection'
		navigasi[2].class = ''

		Barang.find({
		sort : 'id DESC'
		})
		.exec((data) => {
			res.view('data',
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
};
