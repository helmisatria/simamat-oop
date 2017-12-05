var session = require('supertest-session');
const assert = require('assert');

var testSession = null;
var authenticatedSession = null;

beforeEach(function (done) {

  testSession = session(sails.hooks.http.app);
  testSession.post('/login')
  .send({ username: 'admin', password: 'admin' })
  .expect(200)
  .end(done);
});

const userUpdate = {
  id: '5a007220ee87a6b1609d67ba',
  data: [ 
    { name: 'nama', value: 'IMPAL kelompok 1' },
    { name: 'no_ktp', value: '123' },
    { name: 'role', value: 'Admin' },
    { name: 'alamat', value: 'F205' } 
  ]
}

describe('AdminController', function() {
  describe('#createuser', () => {
    it('should create a new user', (done) => {
      testSession
        .post('/create_data/user')
        .send({
          _id: 'test',
          username: 'uniqueusername3', 
          password: 'password',
          nama: 'IMPAL kelompok 1',
          role: 'Admin',
          no_ktp: '123',
          alamat: 'F205'
        })
        .expect(200)
        .end(() => {
          User
          .destroy({ id: 'test' })
          .exec(() => {
            done()
          })
        })
    })
  })

  describe('#updateuser', () => {
    it('should update a user', (done) => {
      testSession
        .post('/edit_data/user/4')
        .send(userUpdate)
        .expect(200)
        .end(done)
    })
  })

  describe('#deleteuser', () => {
    it('should delete a user', (done) => {
      User.create({ _id: 'testing' }).exec(() => {
        testSession
          .post('/delete_data/user')
          .send({ id: 'testing' })
          .expect(200)
          .end(done)
      })
    })
  })

  describe('#kelolaRole', () => {
    it('should kelola role specified user\'s id', (done) => {
      testSession
        .post('/kelola_role')
        .send({ 
          id: '5a00740a39189bf62a6bd23c',
          role: 'Staf Gudang'
        })
        .expect(200)
        .end(done)
    })
  })
  
});