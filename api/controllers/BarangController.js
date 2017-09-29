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
	}
};
