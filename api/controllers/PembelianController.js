/**
 * PembelianController
 *
 * @description :: Server-side logic for managing pembelians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	halamanpembelian: (req, res) => {
		/*
			NAVIGASI
		 */
		const navigasiAdmin = require('../../navigasi/admin')
		/*
		DATA CONTENT
		 */
		const dataContentStafGudang = require('../../dataContent/staf_gudang')
		/*
		TABLE ROW
		 */
		const tableRowStafGudang = require('../../dashboard/tablerow/staf_gudang')

		const navigasi = navigasiAdmin
  	const dataContent = dataContentStafGudang
  	const dataTR = tableRowStafGudang

  	res.view('users/pembelian', {
    	navigasi,
    	dataContent,
    	dataTR
		})
	},
};
