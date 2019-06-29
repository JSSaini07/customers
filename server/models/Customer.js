const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  customerID: Number,
  name: {
      first: String,
      last: String
  },
  birthday: String,
  gender: String,
  lastContact: String,
  customerLifetimeValue: Number
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
