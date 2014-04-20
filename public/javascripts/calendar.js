var GithubGadgets = GithubGadgets || {};
GithubGadgets.calendar = function(username, container) {
  var width = 960,
      height = 136,
      cellSize = 13; // cell size

  var day = d3.time.format("%w"),
      week = d3.time.format("%U"),
      percent = d3.format(".1%"),
      format = d3.time.format("%Y-%m-%d");

  var color = d3.scale.quantize()
      .domain([0, 11])
      .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

  var svg = d3.select(container).selectAll("svg")
      .data([2014])
      .enter().append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "RdYlGn")
      .append("g")
      .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

  svg.append("text")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .style("text-anchor", "middle")
      .text(function(d) { return d; });

  var rect = svg.selectAll(".day")
      .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) { return week(d) * cellSize; })
      .attr("y", function(d) { return day(d) * cellSize; })
      .attr("fill", "#fff")
      .datum(format);

  rect.append("title")
      .text(function(d) { return d; });

  svg.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);

  d3.json("http://vast-meadow-7354.herokuapp.com/"+username+"/calendar", function(error, json) {
    var data = d3.nest()
      .key(function(d) { 
        return d.date; 
      })
      .rollup(function(d) {
        return d[0].total;
      }).map(json);

    rect.filter(function(d) { return d in data; })
      .attr("fill", function(d) {
        return getGreyColor(data[d]);
      })
      .select("title")
        .text(function(d) { return data[d] + ' contributions on ' + d; });
  });

  function monthPath(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = +day(t0), w0 = +week(t0),
        d1 = +day(t1), w1 = +week(t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
  }

  function getGreyColor(num) {
    var rgb = parseInt(255 - ((num/10)*255));
    return 'rgb('+rgb+','+rgb+','+rgb+')';
  }

  svg.selectAll(".day").on("mouseenter", function() {
    console.log(this.getElementsByTagName('title')[0].innerHTML);
  });

}
