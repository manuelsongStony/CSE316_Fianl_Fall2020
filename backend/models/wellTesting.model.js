const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wellTestingSchema = new Schema({
    poolBarcode: { type: String, required: true },
    wellBarcode: { type: String, required: true },
    testingStartTime: { type: Date, required: true },
    testingEndTime: { type: Date, required: true },
    result: { type: String, required: true }
});

const WellTesting = mongoose.model('WellTesting', wellTestingSchema);

module.exports = WellTesting;