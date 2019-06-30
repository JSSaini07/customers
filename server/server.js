const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./utils/db');

// routes
const addCustomer = require('./routes/addCustomer');
const fetchCustomer = require('./routes/fetchCustomer');
const fetchAllCustomers = require('./routes/fetchAllCustomers');
const updateCustomer = require('./routes/updateCustomer');
const deleteCustomer = require('./routes/deleteCustomer');

const app = express();
const port = process.argv.port || 3000;
morgan(':method :url :status :res[content-length] - :response-time ms')

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

connectDB();

// CRUD APIs for customer data

app.post('/addCustomer', addCustomer);
app.get('/fetchCustomer', fetchCustomer);
app.get('/fetchAllCustomers', fetchAllCustomers);
app.put('/updateCustomer', updateCustomer);
app.delete('/deleteCustomer', deleteCustomer);

app.listen(port);
