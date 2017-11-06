/**
 * KasirController
 *
 * @description :: Server-side logic for managing kasirs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pembelian : (req, res) => {
		
		let sisaBarang = 0
		function checkStokBarang(datas) {
			const promises = datas.map((data) => {
				return new Promise((resolve, reject) => {
					const id = data.id
					const namaBarang = data.nama_barang
					const count = data.jumlah
					
					Barang.findOne({ id }, (err, result) => {						
						if (Number(result.stok) < Number(count)) {
							sisaBarang = Number(result.stok)
							reject(namaBarang)
						} else {
							resolve()
						}
					})
				})
			})
			return Promise.all(promises)
			.then(() => {
				return true
			})
			.catch((namaBarang) => {
				return namaBarang
			})
		}

		const beli = async(data) => {
			
			const id_kasir = req.session.user.id
			for (var index = 0; index < data.length; index++) {
				
				const id_barang = data[index].id
				const jumlah = data[index].jumlah
				try {					
					const beli = await Pembelian.create({ id_kasir }).exec()						
						
					const update = await Barang.findOne({ id: id_barang}).exec((err, barang) => {
						if (err) {
							console.log({err});
							
						} else {
							console.log(barang);
							barang.stok -= parseInt(jumlah)
							barang.save()
						}
					})

					await Pembelian.create({
						id_kasir,
						data_barang: data
					})

				} catch (error) {
					return error
				}				
			}
		}

		const { body } = req		
		
	  const data = []
	  for (let i = 0; i < body.countBelanja; i++) {
			let barang = {
				id: body.data[i][0],
				nama_barang: body.data[i][1],
				jumlah: body.data[i][2],
				harga: body.data[i][3]
			}
	    data.push(barang)
		}
		
	  const check = checkStokBarang(data)
	  check.then((a) => {
	    if (a === true) {

				beli(data).then((result) => {					
					res.status(200).send({
						text: 'Pembelian barang berhasil dilakukan',
						type: 'success'
					})
				})
	    } else {
	      res.status(400).send({
	        text: `Maaf, stok ${a} tersisa ${sisaBarang} unit`,
	        type: 'error'
	      })
	    }
	  })
	  .catch((e) => {
	    res.status(400).send({
	      text: `Maaf, stok ${e} tersisa ${sisaBarang} unit`,
	      type: 'error'
	    })
	  })
	}
};
