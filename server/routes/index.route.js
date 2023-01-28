const express = require('express');
const router = express.Router();


var indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', indexController.home );

module.exports = router;