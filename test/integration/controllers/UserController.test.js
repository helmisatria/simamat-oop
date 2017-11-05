var request = require('supertest');
const assert = require('assert');

describe('UserController', function() {
  describe('#login', function() {
    it('should redirect to /dashboard', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ username: 'kasir', password: 'kasir' })
        .expect(200)
        .end(done)
    });
  }); 

  describe('#logout', function() {
    it('should redirect to /login and logged out succesfully', function (done) {
      request(sails.hooks.http.app)
        .get('/logout')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done)
    });
  }); 

  describe('#getDataUser', function() {
    it('should get a user with id specified', function (done) {
      request(sails.hooks.http.app)
        .post('/get_data/user')
        .send({
          id: "59fe02b47967471b2ea46e1f"
        })
        .expect(200)
        .end(done)
    });
  }); 

  describe('#getCountDataUser', function() {
    it('should get sum (count) of User from database', function (done) {
      request(sails.hooks.http.app)
        .post('/get_count_dashboard/user')
        .expect(200)
        .end((err, result) => {
          assert.equal(result.body.data[0], 2)
          done()
        })
    });
  }); 
});