var jsdom = require('jsdom');
var d3 = require('d3');

/**
 * Crea la grafica de pie
 */
exports.draw = function(info,height) {
  var document = jsdom.jsdom();
	var data = [];
	var dataSortable = info;

	//Si el valor es 0 se elimina el item de la vista
	dataSortable.forEach( function (item,index,object) {
		if(item.value == 0){
			object.splice(index,1);
		}
	});

	//Ordenamiento
	dataSortable.sort(function(o1, o2) {
		return o1.value - o2.value;
	});

	//Intercalado de mayor y menor
	var dataLength = dataSortable.length;
	for (var i = 0; i < dataLength; i++) {
		if (i % 2 == 0) {
			data.push(dataSortable.shift());
		} else {
			data.push(dataSortable.pop());
		}
	}

	var width = 500;
	height = height || 250;
	var radius = Math.min(width, height) / 2;
  var style="\n /* <![CDATA[ */\n svg {\n width: 100%;\n }\n path.slice {\n\n stroke-width:2px;\n\n }\n\n polyline{\n opacity: .3;\n stroke: black;\n stroke-width: 2px;\n fill: none;\n }\n /* ]]> */";
	var svg = d3.select(document.body)
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("version", 1.1)
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .append("g");

  svg.append("style")
  .attr('type','text/css')
  .text(style);

	svg.append("g").attr("class", "slices");
	svg.append("g").attr("class", "labels");
	svg.append("g").attr("class", "lines");

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	});

	var arc = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);

	var outerArc = d3.svg.arc().innerRadius(radius * 0.9).outerRadius(
			radius * 0.9);

	svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var key = function(d) {
		return d.data.label;
	};

	var color = d3.scale.ordinal().range(
			[ "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
					"#ff8c00" ]);

	change(data);

	function change(data) {

		/* ------- PIE SLICES -------*/
		var slice = svg.select(".slices").selectAll("path.slice").data(
				pie(data), key);

        slice.enter().insert("path").style("fill", function(d) {
    			return color(d.data.label);
    		}).attr("class", "slice")
    		  .attr("d", arc);


		/* ------- TEXT LABELS -------*/


    var text = svg.select(".labels").selectAll("text").data(pie(data), key);

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.enter().append("text")
    .attr("dy", ".35em").text(function(d) {
      var percentage = d.data.value * 100;
      percentage = percentage.toFixed(1);
      var label = percentage +'%' + '(' + d.data.label + ')';
      return label;
    })
    .attr("transform", function(d){
      var pos = outerArc.centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    })
    .attr("text-anchor", function(d){
      return midAngle(d) < Math.PI ? "start" : "end";
    });

		/* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline").data(
				pie(data), key);

		polyline.enter().append("polyline")
		.attr('points', function (d){
			var pos = outerArc.centroid(d);
			pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
			return [ arc.centroid(d), outerArc.centroid(d), pos ];
		});

	};
  return d3.select(document.body).html();
}
