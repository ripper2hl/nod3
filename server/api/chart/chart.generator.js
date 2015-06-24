'use strict';

var pie = require('./chart.pie');
var jsdom = require('jsdom');

exports.pie = function(data){
  var container = jsdom.jsdom();
  return pie.draw(data,container);
};
