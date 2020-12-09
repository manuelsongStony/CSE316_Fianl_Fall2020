const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poolMapSchema = new Schema({
  testBarcode: { type: String, required: true },
  poolBarcode: { type: String, required: true }

});

const PoolMap = mongoose.model('PoolMap', poolMapSchema);

module.exports = PoolMap;