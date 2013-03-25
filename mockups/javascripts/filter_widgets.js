var filterWidgets = {
    publicationList: function() {
        var dimension,
            nest;
        
        function list(div){
            
            var nestedPubs = nest.entries( dimension.bottom(40) );
            
            var decade = div.selectAll(".decade")
                .data(nestedPubs, function(d){ return d.key; });
            
            decade.enter().append("div")
                .attr("class", "decade")
              .append("div")
                .attr("class", "decadeYear")
                .text(function(d){ return d.key; });
            decade.exit().remove();
            
            var pubItems = decade.order().selectAll('.pub')
                .data(function(d){ return d.values;}) // TODO add key back in when rod adds _id back into articles api, function(d){ return d["_id"]; });

            // Enter
            var pubItemsEnter = pubItems.enter().append('div')
                .attr("class", function(d){ return 'pub ' + d.type; } );
                
            var thumbnail = pubItemsEnter.append("div")
                .attr("class", 'thumbnail')
                .append("img")
                .attr("src", function(d){ return (d.thumbnail_url) ? bionames.url(d.thumbnail_url) : ''; })
                .attr("onload", "$(this).fadeIn();")
                .style("display", "none");

            var citation = pubItemsEnter.append("div")
                .attr("class", 'citation');
            
            citation.append("div")
                .attr("class", "title")
                .text(function(d){ return d.title; });
            
            citation.append("div")
                .attr("class", "meta")
                .html(function(d){ return "<span class='authors'>"+ ((d.author) ? authorList(d.author) : "") + "</span> <span class='j-sep'>in</span> <span class='journal'>"+( (d.journal) ? d.journal.name : '')+"</span> (<span class='year'>"+d.year+"</span>)"; });
                
            citation.select(".j-sep").style("display", function(d){ return (d.journal) ? "inline" : "none"; });
            
            // Update
            pubItems.order();
            
            // Exit
            pubItems.exit().remove();
            
            
            function authorList(authors) {
                return authors.map( function(author){
                    return "<span class='author'>" + ((author.name) ? author.name : author) + "</span>";
                }).join(", ");
            }
        }
        
        list.dimension = function(d){
            if(!arguments.length) return dimension;
            dimension = d;
            return list;
        }
        
        list.nest = function(n) {
          if(!arguments.length) return nest;
          nest = n;
          return list;
        }
        
        return list;
    },
    
    histCount: 0, // Used to create a unique ID for each chart
    histogram: function() {
        var margin = { top: 10, right: 12, bottom: 20, left: 12 },
            xScale, // You must set with .xScale accessor. Note that the width of the chart is equal to the range
            yScale = d3.scale.linear().rangeRound([0, 80]), // Sets a default chart height of 80, you can change it of course
            id = this.histCount++,
            axis = d3.svg.axis().orient('bottom').tickFormat( d3.format("d") ),
            brush = d3.svg.brush(),
            needsRedraw, // a 'dirty' flag that lets us know to redraw the brush
            dimension, // reference used by the brush to create the appropriate filter
            group, // provides the data for the histogram
            round, // allows the brush to "snap" to the bars in the chart
            bucketSize = 1, // For calculating the bar width
            barMargin = 1; // Spacing in between bars
        
        // Draw or redraw a histogram into the div selector passed in as an argument
        function chart(div) {
            var w = xScale.range()[1];
            var h = d3.max( yScale.range() );
            
            // Calculate the bar width. We use the group here since it represents our bucket size
            var barWidth = xScale( xScale.domain()[0] + bucketSize ) - xScale( xScale.domain()[0] ) - barMargin;
            
            yScale.domain([0, group.top(1)[0].value]);
            
            div.each(function(){
                var div = d3.select(this);
                var g = div.select("g");

                // Create the plot elements if necessary
                if( g.empty() ){
                    g = div.append("svg")
                        .attr("width", w + margin.left + margin.right)
                        .attr("height", h + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", "translate("+margin.left+","+margin.top+")");
                    
                    // Bars
                    g.append("g").attr("class", "bars"); // Actually get drawn later
                    
                    // Axis
                    g.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0,"+h+")")
                        .call(axis)
                      .append('line')
                        .attr('class', 'myDomain')
                        .attr({ x1: xScale.range()[0], y1: 0, x2: w, y2: 0});
                    
                    // Brush
                    var theBrush = g.append("g")
                        .attr("class", "x brush")
                        .call(brush);
                        
                    theBrush.selectAll("rect")
                        .attr("y", 0)
                        .attr("height", h);
                    theBrush.selectAll(".resize").append("path").attr('d', resizeHandle);
                    theBrush.selectAll(".resize").append("line").attr({ class: 'edge', x1: 1, y1: 0, x2: 1, y2: h });
                }
                
                // needsRedraw is set when the domain or group is
                // modified by an external agent. See #filter
                if( needsRedraw ) {
                    needsRedraw = false;
                    g.selectAll(".brush").call(brush)
                }
                
                drawBars(g.select(".bars").selectAll(".bar"));
            });
            
            
            function drawBars(bars){
                var b = bars.data(group.all());
        
                // Enter
                b.enter().append("rect")
                    .attr("class", "bar")
                    .attr("width", barWidth)
                    .attr("x", function(d){ return xScale(d.key); });
        
                // Update
                b.attr("y", function(d){ return h - minHeight(yScale(d.value)); })
                    .attr("height", function(d){ return minHeight(yScale(d.value)); });
        
                // Exit
                b.exit().remove();
            }
            
            function minHeight(v){
              var mH = 2;
              return ( v < mH ) ? mH : v;
            }
            
            function resizeHandle(d) {
              var e = +(d == "e"),
                  x = e ? 1 : -1,
                  y = h / 3;
              return "M" + (.5 * x) + "," + y
                  + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
                  + "V" + (2 * y - 6)
                  + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
                  + "Z"
                  + "M" + (2.5 * x) + "," + (y + 8)
                  + "V" + (2 * y - 8)
                  + "M" + (4.5 * x) + "," + (y + 8)
                  + "V" + (2 * y - 8)
                  + "M" + (.5 * x) + "," + h
                  + "V0"; 
            }
        }
        
        brush.on("brush.chart", function(){
            var g = d3.select(this.parentNode);
            var extent = brush.extent();
            
            // Snap to bars if round function is set
            if( round ) {
                extent = brush.extent().map( round );
                g.select(".brush").call( brush.extent(extent) );
            }
            
            dimension.filterRange( extent );
        });
        
        brush.on("brushend.chart", function() {
          if (brush.empty()) {
            dimension.filterAll();
          } else {
              if( round ) {
                  var g = d3.select(this.parentNode);
                  var extent = brush.extent();
                  extent = brush.extent().map( round );
                  g.select(".brush").call( brush.extent(extent) );
              }
          }
        });
        
        // Get/set margins. 
        chart.margin = function(m){
            if(!arguments.length) return margin;
            margin = m;
            return chart;
        };
        
        // Get/set the X-Scale. You are required to set this, as it defaults to null
        // When set, it also sets the references in axis and brush
        chart.xScale = function(x){
            if(!arguments.length) return xScale;
            xScale = x;
            axis.scale(x);
            brush.x(x);
            return chart;
        };
        
        // Get/set the Y-Scale. 
        chart.yScale = function(y){
            if(!arguments.length) return yScale;
            yScale = y;
            return chart;
        };
        
        
        // Get/set the dimension.
        // This reference is used by the brush to filter your data
        chart.dimension = function(d){
            if(!arguments.length) return dimension;
            dimension = d;
            return chart;
        };
        
        // Filter the data in this chart to some range.
        // Allows an external agent to set or clear the brush and dimension
        // Passing no arguments clears any existing filters
        chart.filter = function(f){
            if(f){
                brush.extent(f);
                dimension.filterRange(f);
            } else {
                brush.clear();
                dimension.filterAll();
            }
            
            needsRedraw = true;
            return chart;
        };
        
        // Get/set the group, which provides the data for the histogram.
        // You are required to set this, otherwise there won't be any data to chart
        chart.group = function(g){
            if(!arguments.length) return group;
            group = g;
            return chart;
        };
        
        // Get/set a rounding function, which if set will make the brush snap
        // to whatever your round function deems necessary. You can use it
        // to ensure that the brush snaps to whole bars.
        chart.round = function(r){
            if(!arguments.length) return round;
            round = r;
            return chart;
        };
        
        // For calculating the correct bar width for plots
        chart.bucketSize = function(b) {
          if(!arguments.length) return bucketSize;
          bucketSize = b;
          return chart;
        }
        
        // Exposes the brush's event binding method onto the chart object
        d3.rebind(chart, brush, "on");

        return chart;
    }
};