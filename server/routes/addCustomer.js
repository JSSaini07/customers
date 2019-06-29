const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js'); 
const validateFields = require('../utils/validateFields');
const logger = require('../utils/logger');

router.post('/addCustomer', (req, res) => {
  const {customerID = '', name, name:{first = '', last = ''}, birthday = '', gender = '', lastContact = '', customerLifetimeValue = ''} = req.body;
  const fieldErrors = validateFields({customerID, first, last, birthday, gender, lastContact, customerLifetimeValue});
  if(fieldErrors.length) {
    logger.error(`Invalid data \n${fieldErrors.join('\n')}`);
    res.json({status: false, message: fieldErrors});
    return;
  }
  const data = {customerID, name, birthday, gender, lastContact, customerLifetimeValue};
  const addCustomer = new Customer(data);
  // check if customer with customer id already exists
  Customer.findOne({customerID}, (err, data) => {
    if(err) {
      logger.error(`Error while adding customer ${err}`);
      res.json({status: false, message: err});
      return;
    }
    if(data) {
      const message = `Customer with id CustomerId ${customerID} already exists`;
      logger.error(message);
      res.json({status: false, message});
      return;
    }
    addCustomer.save((err, customerData) => {
      if(err) {
        logger.error(`Error while adding customer ${err}`);
        res.json({status: false, message: err});
        return;
      }
      logger.success('Added a customer');
      res.json({status: true, message: customerData});
      return;
    });
  });
})

module.exports = router;
