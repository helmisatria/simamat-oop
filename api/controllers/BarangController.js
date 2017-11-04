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
		const { body } = req

		Barang.findOne({ id: body.id })
			.then((result) => {
				if (result) return res.status(200).send(result)
				return res.status(400).send('Tidak Ditemukan')
			})
			.catch((e) => {
				res.status(400).send({ responseText: e })
			})
	},

	getCountDataBarang: (req, res) => {
		const data = []

	  Barang.count({})
	  .then((result) => {
	    data.push(result)
	    res.status(200).send({ data })
	  })
	  .catch((e) => {
	    res.status(400).send(e)
	  })
	},

	deleteBarang: (req, res) => {
		const { body } = req
	
		Barang.destroy({ id: body.id })
			.then((result) => {
				if (result) return res.status(200).send(result)
				res.status(400).send('Barang Tidak Ditemukan')
			})
			.catch((e) => {
				res.status(400).send(e)
			})
	},

	getCountDataBarang: (req, res) => {
		const data = []
		
		Barang.count({})
			.then((result) => {
				data.push(result)
				res.status(200).send({ data })
			})
			.catch((e) => {
				console.log(e)
			})
	}
};
