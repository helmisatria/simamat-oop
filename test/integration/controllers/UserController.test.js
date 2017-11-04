var request = require('supertest');

describe('UserController', function() {

  describe('#login()', function() {
    it('should redirect to /dashboard', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ username: 'asd', password: 'asd' })
        .expect(200)
        .end(done)
    });
  });
});
