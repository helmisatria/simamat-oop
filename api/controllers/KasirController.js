/**
 * KasirController
 *
 * @description :: Server-side logic for managing kasirs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
