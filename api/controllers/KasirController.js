/**
 * KasirController
 *
 * @description :: Server-side logic for managing kasirs
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

	pembelian : (req, res) => {
		const { body } = req
	  const data = []
	  for (let i = 0; i < body.countBelanja; i++) {
	    data.push(body[`data[${i + 2}][]`])
	  }
	  const check = checkStokBarang(data)
	  check.then((a) => {
	    if (a === true) {
	      res.status(200).send({
	        text: 'Pembelian barang berhasil dilakukan',
	        type: 'success'
	      })
	    } else {
	      res.status(400).send({
	        text: `Maaf, ${a} stok tidak mencukupi`,
	        type: 'error'
	      })
	    }
	  })
	  .catch((e) => {
	    res.status(400).send({
	      text: `Maaf, ${e} stok tidak mencukupi`,
	      type: 'error'
	    })
	  })
	}
};
