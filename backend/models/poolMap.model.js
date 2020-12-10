const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poolMapSchema = new Schema({
  
  poolBarcode: { type: String, required: true },
  testBarcodes:  [{type: String}]
});

const PoolMap = mongoose.model('PoolMap', poolMapSchema);

module.exports = PoolMap;