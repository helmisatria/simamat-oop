var session = require('supertest-session');
const assert = require('assert');

var testSession = null;
var authenticatedSession = null;

beforeEach(function (done) {
  testSession = session(sails.hooks.http.app);
  testSession.post('/login')
  .send({ username: 'kasir', password: 'kasir' })
  .expect(200)
  .end(done);
});

describe('BarangController', function() {
  describe('#getIdBarang', () => {
    it('should get all of Barang\'s id ', (done) => {
      testSession
        .get('/get_id_barang')
        .expect(200)
        .end(done)
    })
  })

  describe('#getDataBarang', () => {
    it('should get a Barang\'s detail', (done) => {
      testSession
        .post('/get_data/barang')
        .send({ id: '5a26b0297a3bb4f65c97620c' })
        .expect(200)
        .end(done)
    })
  })

  describe('#getCountDataBarang', () => {
    it('should get count or sum all of barang\'s data', (done) => {
      testSession
        .post('/get_count_dashboard/barang')
        .expect(200)
        .end(done)
    })
  })

  describe('#deleteBarang', () => {
    it('should delete a Barang', (done) => {
      Barang.create({
        nama_barang: 'testing',
        id_staf_gudang: '999'
      }).exec((err, barang) => {
        testSession
          .post('/delete_data/barang')
          .send({ id: barang.id })
          .expect(200)
          .end(done)
      })
    })
  })
  
});