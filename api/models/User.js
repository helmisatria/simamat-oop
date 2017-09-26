/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      required: true
    },
    nama: {
      type: 'string',
      required: true
    },
    no_ktp: {
      type: 'string',
      required: true
    },
    alamat: {
      type: 'string',
      required: true
    }
  },

  attemptLogin: (inputs, cb) => {
    User.findOne({
      username: inputs.username,
      password: inputs.password
    }).exec(cb)
  }
};
