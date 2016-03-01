var blah;
var raw_width = parseInt(d3.select('.the_viz').style('width')), raw_height = parseInt(d3.select('.the_viz').style('height'));
var margin = {top: raw_height/10, right: raw_width/10, bottom: raw_height/10, left: raw_width/10};
var w = raw_width - margin.left - margin.right, h = raw_height - margin.top - margin.bottom;

d3.csv("data/Coffee_Data.csv", function(datas) {  
  var data = [];
  var waterdata = [];
  var coffeedata = [];
  var format = d3.time.format("%m/%d/%Y %I:%M %p");
  for (i=0; i<datas.length; i++) {
    data[i] = {
      'name': datas[i]['Coffee Name'],
      'date': format.parse(datas[i]['Date'] + ' ' + datas[i]['Time']),
      'quantity': datas[i]['Quantity (cups)']
    };
    if (datas[i]['Coffee Name']=="Water") {
      waterdata.push({
      'name': datas[i]['Coffee Name'],
      'date': format.parse(datas[i]['Date'] + ' ' + datas[i]['Time']),
      'quantity': datas[i]['Quantity (cups)']
      })
    }
    else {
      coffeedata.push({
      'name': datas[i]['Coffee Name'],
      'date': format.parse(datas[i]['Date'] + ' ' + datas[i]['Time']),
      'quantity': datas[i]['Quantity (cups)']
      })
    }
  }
  blah = data;
  var svg = d3.select(".the_viz")
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 " + raw_width + " " + raw_height)
              .classed("svg-content-responsive", true)
              .append("g")
              .attr('transform', 'translate(' + margin.left/2 + ', ' + margin.top/2 + ')');;
  mindate = format.parse(datas[0]['Date']+ ' 0:00 AM');
  lastdate = data[Object.keys(data).length-1].date;
  maxdate = format.parse((lastdate.getMonth()+1) + '/' + (lastdate.getDate()+1) + '/' + lastdate.getFullYear() + ' ' + '0:00 AM')
  var xScale = d3.time.scale()
                      .domain([mindate,maxdate])
                      .range([0, w]);

  var yScale = d3.scale.linear()
                       .domain([0, d3.max(data.map(function(obj) {return obj.quantity}))])
                       .range([h,0]);
  
  var xAxis = d3.svg.axis()
                .scale(xScale)
                .tickFormat(d3.time.format('%A'))
                .ticks(10)
                .outerTickSize(0);

  var yAxis = d3.svg.axis()
                .orient("left")
                .scale(yScale)
                .tickValues([1, 2, 3]);

  var valueline = d3.svg.line()
                    .x(function(d) {
                        return xScale(d.date);
                    })
                    .y(function(d) {
                        return yScale(d.quantity);
                    });

  var div = d3.select(".the_viz").append("div")
              .attr("class", "tooltip")
              .style("opacity",0);

  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
        return xScale(d.date);
      })
     .attr("cy", function(d) {
        return yScale(d.quantity);
      })
      .attr("class", function(d) {
        if (d.name==='Water') {
          return 'waterdata';
        }
        else {
          return 'coffeedata';
        }
      })
      .attr("r", 7)
      .attr("id", function(d,i) {
        return i;
      })
      .on("mouseover", function(d) {
        div.transition()
           .duration(200)
           .style("opacity",1)
           .style('background', function() {
            if (d.name === 'Water') {
            return '#0068B2';
            }
            else {
              return '#B26A00';
            }
           });
        d3.select(this).style("fill",function() {
          if (d.name === 'Water') {
            return '#0068B2';
          }
          else {
            return '#B26A00';
          }
        });
        div.html(d.name + '<br>' + d.date )
           .style("left",(d3.event.pageX-10)+"px")
           .style("top",(d3.event.pageY+10)+"px");
      })
      .on("mouseout", function(d) {
        div.transition()
           .duration(500)
           .style("opacity",0);
        d3.select(this).style("fill",function() {
          if (d.name === 'Water') {
            return '#76C6FF';
          }
          else {
            return '#FFAF3B';
          }
        });
      })
      .on("click", function(d) {
        $('tr').hide();
        $('#the_head').show();
        $('#' + d3.select(this).attr('id') + '_tabledata').show();
      })
      .style("fill", function(d) { 
        if (d.name === 'Water') {
          return '#76C6FF';
        } 
        else {
          return '#FFAF3B';
        }
      });

  svg.append("path")
     .attr("class","waterline")
     .attr("d", valueline(waterdata))
     .style('stroke-dasharray', ('20,20'));
  
  svg.append("path")
     .attr("class","coffeeline")
     .attr("d", valueline(coffeedata));

  svg.append('g')
      .attr('class','xaxis')
      .attr('transform', 'translate(0, ' + h + ')')
      .call(xAxis);

  svg.append("g")
        .attr("class", "yaxis")
        .call(yAxis);
});