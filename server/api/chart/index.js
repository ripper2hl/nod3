'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./chart.controller');

router.post('/:name',controller.generate);

module.exports = router;
