var session = require('supertest-session');
const assert = require('assert');

var testSession = null;

beforeEach(function (done) {
  testSession = session(sails.hooks.http.app);
  testSession.post('/login')
  .send({ username: 'admin', password: 'admin' })
  .expect(200)
  .end(done);
});

describe('UserController', function () {
  describe('#login', function () {
    it('should redirect to /dashboard', function (done) {
      testSession
        .post('/login')
        .send({
          username: 'kasir',
          password: 'kasir'
        })
        .expect(200)
        .end(done)
    });
  });

  describe('#getCountDataUser', function () {
    it('should get sum (count) of User from database', function (done) {
      testSession
        .post('/get_count_dashboard/user')
        .expect(200)
        .end((err, result) => {
          assert.equal(result.body.data[0], 2)
          done()
        })
    });
  });

  describe('#getDataUser', function () {
    it('should get a user with id specified', function (done) {
      testSession
        .post('/get_data/user')
        .send({
          id: '5a007220ee87a6b1609d67ba'
        })
        .expect(200)
        .end(done)
    });
  });

  describe('#logout', function () {
    it('should redirect to /login and logged out succesfully', function (done) {
      testSession
        .get('/logout')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done)
    });
  });
});
