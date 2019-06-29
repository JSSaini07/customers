const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js'); 
const validateFields = require('../utils/validateFields');
const logger = require('../utils/logger');

router.get('/fetchCustomer', (req, res) => {
  const {id: customerID = ''} = req.query;
  const fieldErrors = validateFields({customerID});
  if(fieldErrors.length) {
    logger.error(`Invalid data \n${fieldErrors.join('\n')}`);
    res.json({status: false, message: fieldErrors});
    return;
  }

  Customer.findOne({customerID}, (err, customerData) => {
    if(err) {
      logger.error(`Error while fetching customer ${err}`);
      res.json({status: false, message: err});
      return;
    }
    if(!customerData) {
      const message = `Customer with id customerID ${customerID} does not exist`;
      logger.error(message);
      res.json({status: false, message});
      return;
    }
    logger.success(`Fetched customer with customerID ${customerID}`);
    res.json({status: true, message: customerData});
    return;
  });
});

module.exports = router;
