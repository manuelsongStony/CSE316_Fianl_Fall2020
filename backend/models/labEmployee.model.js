const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labEmployeeSchema = new Schema({
  labID: { type: String, required: true },
  password: { type: String, required: true }

});

const LabEmployee = mongoose.model('LabEmployee', labEmployeeSchema);

module.exports = LabEmployee;