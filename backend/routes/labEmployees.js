const router = require('express').Router();
let LabEmployee = require('../models/labEmployee.model');

router.route('/').get((req, res) => {
    LabEmployee.find()
    .then(labEmployees => res.json(labEmployees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const labID = req.body.labID;
    const password = req.body.password;
  


  
    const newLabEmployee = new LabEmployee({
      labID,
      password
     
    });
  
    newLabEmployee.save()
    .then(() => res.json('LabEmployee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;