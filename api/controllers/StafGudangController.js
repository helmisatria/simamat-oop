/**
* StafGudangController
*
* @description :: Server-side logic for managing stafgudangs
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {



	/**
	* `StafGudangController.createbarang()`
	*/
	createbarang: function (req, res) {
		const { body } = req
		Object.assign(body, { id_staf_gudang: req.session.user.id})

		Barang.create(body, function(err, result){
			if (err) {
				res.status(400).send({ responseText: 'Tambah barang gagal'})
			} else {
				res.status(200).send({ responseText: 'Tambah barang baru berhasil'})
			}
		})
	},


	/**
	* `StafGudangController.updatebarang()`
	*/
	updatebarang: function (req, res) {
		const { body } = req
		const { collection, fieldCount } = req.params
		console.log({ body });
		for (let i = 0; i < fieldCount; i++) {
			Barang.findOneAndUpdate({ _id: ObjectId(body.id) }, {
				$set: {
					[body[`data[${i}][name]`]]: body[`data[${i}][value]`]
				}
			})
			.catch((e) => {
				console.log(e)
			})
		}
		return res.status(200).send()
	},


	/**
	* `StafGudangController.deletebarang()`
	*/
	deletebarang: function (req, res) {
		return res.json({
			todo: 'deletebarang() is not implemented yet!'
		});
	},


	/**
	* `StafGudangController.getbarang()`
	*/
	getbarang: function (req, res) {
		return res.json({
			todo: 'getbarang() is not implemented yet!'
		});
	}
};
