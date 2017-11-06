var request = require('supertest');
const assert = require('assert');

describe('KasirController', function() {
  describe('#halamanpembelian', () => {
    it('should directed to /pembelian', (done) => {
      request(sails.hooks.http.app)
        .get('/pembelian') 
        .expect(302)
        .end(done)
    })
  })
});