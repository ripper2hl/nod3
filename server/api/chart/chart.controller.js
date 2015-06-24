'use strict';

var generator = require('./chart.generator');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.generate = function (req,res) {
  var chart = generator[req.params.name](JSON.parse(req.body.data));
  console.log(chart);
  res.status(200).send( chart );
};
