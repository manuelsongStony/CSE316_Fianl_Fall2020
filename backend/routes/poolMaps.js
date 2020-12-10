const router = require('express').Router();
let PoolMap = require('../models/poolMap.model');

router.route('/').get((req, res) => {
    PoolMap.find()
    .then(poolMaps => res.json(poolMaps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    
    const poolBarcode = req.body.poolBarcode;
    const testBarcodes = req.body.testBarcodes;
   


  
    const newPoolMap = new PoolMap({
        poolBarcode,
        testBarcodes
        
    });
  
    newPoolMap.save()
    .then(() => res.json('PoolMap added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/:id').get((req, res) => {
    PoolMap.findById(req.params.id)
      .then(poolMap => res.json(poolMap))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    PoolMap.findByIdAndDelete(req.params.id)
      .then(() => res.json('PoolMap deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    PoolMap.findById(req.params.id)
      .then(poolMap => {
        
        poolMap.poolBarcode = req.body.poolBarcode;
        poolMap.testBarcodes = req.body.testBarcodes;
  
        poolMap.save()
          .then(() => res.json('PoolMap updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
module.exports = router;