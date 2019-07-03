const express = require('express');
var path = require('path');
const router = express.Router();

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../../build/','index.html'));
})

module.exports = router;
