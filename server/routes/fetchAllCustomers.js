const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js'); 
const logger = require('../utils/logger');

// This endpoint should ideally return paginated data (For large scale) 
router.get('/fetchAllCustomers', (req, res) => {
  Customer.find((err, customerData) => {
    if(err) {
      logger.error(`Error while fetching customers ${err}`);
      res.json({status: false, message: err});
      return;
    }
    if(!customerData) {
      const message = `No customers present`;
      logger.error(message);
      res.json({status: true, message});
      return;
    }
    logger.success(`Fetched customers ${customerData}`);
    res.json({status: true, message: customerData});
    return;
  });
})

module.exports = router;
