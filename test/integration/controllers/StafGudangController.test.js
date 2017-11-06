var request = require('supertest');
const assert = require('assert');


const barangSample = {
  "nama_barang" : "Barang",
  "stok" : "1",
  "stok_opname" : "5",
  "kategori" : "mainan",
  "id_merk" : "konami",
  "harga_beli" : "999",
  "harga_jual" : "9999"
}

const barangUpdate = {
  id: '5a000adf2e66825d5183d324',
  data: [
    { name: 'nama_barang', value: 'test' }, 
    { name: 'stok', value: '15' },
    { name: 'stok_opname', value: '1' },
    { name: 'kategori', value: 'mainan' },
    { name: 'id_merk', value: 'konami' },
    { name: 'harga_beli', value: '10000' },
    { name: 'harga_jual', value: '100000' } 
  ]
}

describe('StafGudangController', () => {
  describe('#createBarang', () => {
    it('should create a barang to database', (done) => {
      request(sails.hooks.http.app)
        .post('/create_data/barang')
        .send(barangSample)
        .end(done)
    })
  })
  describe('#updateBarang', () => {
    it('should update a barang and saved to database', (done) => {
      request(sails.hooks.http.app)
        .post('/edit_data/barang/7')
        .send(barangUpdate)
        .end(done)
    })
  })
  
  
})
