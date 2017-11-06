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

describe('DataController', function() {
  describe('#default', () => {
    it('should directed to /date successfully', (done) => {
      testSession
        .get('/data')
        .expect(200)
        .end(done)
    })
  })
});