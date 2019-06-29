const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js'); 
const validateFields = require('../utils/validateFields');
const logger = require('../utils/logger');

router.delete('/deleteCustomer', (req, res) => {
  const {id: customerID = ''} = req.query;
  const fieldErrors = validateFields({customerID});
  if(fieldErrors.length) {
    logger.error(`Invalid data \n${fieldErrors.join('\n')}`);
    res.json({status: false, message: fieldErrors});
    return;
  }

  Customer.findOneAndDelete({customerID}, (err, customerData) => {
    if(err) {
      logger.error(`Error while deleting customer ${err}`);
      res.json({status: false, message: err});
      return;
    }
    if(!customerData) {
      const message = `Customer with id customerID ${customerID} does not exist`;
      logger.error(message);
      res.json({status: false, message});
      return;
    }
    logger.success(`Deleted customer with customerID ${customerID}`);
    res.json({status: true, message: customerData});
    return;
  });
})


module.exports = router;
