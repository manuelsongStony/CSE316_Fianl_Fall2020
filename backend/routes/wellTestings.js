const router = require('express').Router();
let WellTesting = require('../models/wellTesting.model');

router.route('/').get((req, res) => {
    WellTesting.find()
    .then(wellTestings => res.json(wellTestings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    
    const poolBarcode = req.body.poolBarcode;
    const wellBarcode = req.body.wellBarcode;
    const testingStartTime = req.body.testingStartTime;
    const testingEndTime = req.body.testingEndTime;
    const result = req.body.result;

  
    const newWellTesting = new WellTesting({
        poolBarcode,
        wellBarcode,
        testingStartTime,
        testingEndTime,
        result
    });
  
    newWellTesting.save()
    .then(() => res.json('WellTesting added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/:id').get((req, res) => {
    WellTesting.findById(req.params.id)
      .then(wellTesting => res.json(wellTesting))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    WellTesting.findByIdAndDelete(req.params.id)
      .then(() => res.json('WellTesting deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    WellTesting.findById(req.params.id)
      .then(wellTesting => {
        
     
        wellTesting.poolBarcode = req.body.poolBarcode;
        wellTesting.wellBarcode = req.body.wellBarcode;
        wellTesting.testingStartTime = req.body.testingStartTime;
        wellTesting.testingEndTime = req.body.testingEndTime;
        wellTesting.result = req.body.result;
  
        wellTesting.save()
          .then(() => res.json('WellTesting updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
module.exports = router;