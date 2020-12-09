const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeTestSchema = new Schema({
  testBarcode: { type: String, required: true },
  employeeID: { type: String, required: true },
  collectionTime: { type: Date, required: true },
  collectedBy: { type: String, required: true },
  

});

const EmployeeTest = mongoose.model('EmployeeTest', employeeTestSchema);

module.exports = EmployeeTest;