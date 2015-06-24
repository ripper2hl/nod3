//http://bl.ocks.org/mbostock/3887235
var d3 = require('d3');

exports.draw = function (data,container){

  var style="\n/* <![CDATA[ */\nbody {\n  font: 10px sans-serif;\n}\n.arc path {\n  stroke: #fff;\n}\n  /* ]]> */";

  var width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

  var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.population; });

  var svg = d3.select(container.body).append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("version", 1.1)
  .attr("xmlns", "http://www.w3.org/2000/svg");

  svg.append("style")
  .attr("type","text/css")
  .text(style);

  svg = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");

  g.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text(function(d) { return d.data.age; });

  return d3.select(container.body).html();
};

/* JSON data test
data=[ {"age": "<5","population": "2704659"},{"age": "5-13","population": "4499890"},     {         "age": "14-17",         "population": "2159981"     },     {         "age": "18-24",         "population": "3853788"     },     {         "age": "25-44",         "population": "14106543"     },     {         "age": "45-64",         "population": "8819342"     },     {         "age": "≥65",         "population": "612463"     } ]
*/
