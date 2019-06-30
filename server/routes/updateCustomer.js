const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js'); 
const validateFields = require('../utils/validateFields');
const logger = require('../utils/logger');

router.put('/updateCustomer', (req, res) => {
  const {customerID = '', name, name:{first = '', last = ''}, birthday = '', gender = '', lastContact = '', customerLifetimeValue = ''} = req.body;
  const fieldErrors = validateFields({customerID, first, last, birthday, gender, lastContact, customerLifetimeValue});
  if(fieldErrors.length) {
    logger.error(`Invalid data \n${fieldErrors.join('\n')}`);
    res.json({status: false, message: fieldErrors});
    return;
  }
  const data = {customerID, name, birthday, gender, lastContact, customerLifetimeValue};
  Customer.findOneAndUpdate({customerID}, data, {new: true}, (err, customerData) => {
    if(err) {
      logger.error(`Error while updating customer ${err}`);
      res.json({status: false, message: err});
      return;
    }
    if(!customerData) {
      const message = `Customer with id CustomerId ${customerID} does not exist`;
      logger.error(message);
      res.json({status: false, message});
      return;
    }
    logger.success(`Updated customer with customerID ${customerID}`);
    res.json({status: true, message: customerData});
  });
})

module.exports = router;
