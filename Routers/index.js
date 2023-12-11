const express = require('express');
const router = express.Router();

router.use("/auth", require('./auth'))
      .get('/', (req, res) => {
         res.send('Home Page');
      })

module.exports = router;    