const router = require('express').Router();
let EmployeeTest = require('../models/employeeTest.model');

router.route('/').get((req, res) => {
    EmployeeTest.find()
    .then(employeeTests => res.json(employeeTests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const testBarcode = req.body.testBarcode;
    const employeeID = req.body.employeeID;
    const collectionTime = req.body.collectionTime;
    const collectedBy = req.body.collectedBy;
   


  
    const newEmployeeTest = new EmployeeTest({
        testBarcode,
        employeeID,
        collectionTime,
        collectedBy
    });
  
    newEmployeeTest.save()
    .then(() => res.json('EmployeeTest added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/:id').get((req, res) => {
    EmployeeTest.findById(req.params.id)
      .then(employeeTest => res.json(employeeTest))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    EmployeeTest.findByIdAndDelete(req.params.id)
      .then(() => res.json('EmployeeTest deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    EmployeeTest.findById(req.params.id)
      .then(employeeTest => {
        employeeTest.testBarcode = req.body.testBarcode;
        employeeTest.employeeID = req.body.employeeID;
        employeeTest.collectionTime = Number(req.body.collectionTime);
        employeeTest.collectedBy = Date.parse(req.body.collectedBy);
  
        employeeTest.save()
          .then(() => res.json('EmployeeTest updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
module.exports = router;