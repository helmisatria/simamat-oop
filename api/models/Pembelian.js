/**
 * Pembelian.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_kasir :{
      type : 'string',
      required : true
    },

    dataBarang :{
      collection : 'barang',
      via : 'id_staf_gudang'
    },

    jumlah :{
      type : 'array',
      required : true
    }
  }
};
