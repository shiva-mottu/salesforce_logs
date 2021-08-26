import React, { Component } from 'react';
import * as d3 from 'd3'
import "./StyleSheets/sequenceSunburst.css"

class SequenceSunBurst extends Component {

  componentDidMount() {
    // Dimensions of sunburst.
    var width = 1000;
    var height = 800;
    var radius = Math.min(width, height) / 1.5;

    var x = d3.scaleLinear()
      .range([0, 2 * Math.PI]);

    var y = d3.scaleLinear()
      .range([0, radius]);

    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    var b = {
      w: 75, h: 30, s: 5, t: 15
    };

    var colors = d3.scaleOrdinal(d3.schemeCategory20);
    this.colors = colors;

    // Total size of all segments; we set this later, after loading the data.
    var totalSize = 0;

    var vis = d3.select("#chart").append("svg:svg")
      .attr("width", width)
      .attr("height", height)
      .append("svg:g")
      .attr("id", "container")
      .attr("d", (d) => console.log(d))
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var partition = d3.partition();

    var arc = d3.arc()
      .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
      .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
      .innerRadius(function (d) { return Math.max(0, y(d.y0)); })
      .outerRadius(function (d) { return Math.max(0, y(d.y1)); });


    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(root => {
      createVisualization(root);
    })

    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json) {

      // Basic setup of page elements.
      initializeBreadcrumbTrail();
      drawLegend(json);
      d3.select("#togglelegend").on("click", toggleLegend);

      // Bounding circle underneath the sunburst, to make it easier to detect
      // when the mouse leaves the parent g.
      vis.append("svg:circle")
        .attr("r", radius)
        .style("opacity", 0);

      // For efficiency, filter nodes to keep only those large enough to see.
      var root = d3.hierarchy(json);

      root.sum(function (d) { return d.duration; });

      var nodes = partition(root).descendants()
        // filtering filters out over half of nodes
        .filter(function (d) {
          var dx = d.x1 - d.x0;
          return (dx > 0.001); // 0.005 radians = 0.29 degrees
        });

      // Determines max depth when entering data to paths
      var maxDepth = 0;
      var path = vis.data(nodes).selectAll("path")
        .data(nodes)
        .enter().append("svg:path")
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function (d) {
          if (d.depth > maxDepth) {
            maxDepth = d.depth;
          }
          return colors((d.children ? d : d.parent).data.text.slice(0, 10));
        })
        .style("opacity", 1)
        .on("mouseover", mouseover);

      // Bounding inner circle based on depth of elements
      var innerG = vis.append("g");

      innerG.append("circle")
        .attr("r", radius / (maxDepth + 1))
        .attr("id", "innerBound")
        .style("opacity", 0);

      innerG.append("text")
        .attr("id", "percentage")
        .attr("x", -20)
        .attr("y", 0)
        .text("");

      // Add the mouseleave handler to the bounding circle.
      d3.select("#container").on("mouseleave", mouseleave);

      // Get total size of the tree = value of root node from partition.
      totalSize = path.node().__data__.value;
    };

    // Fade all but the current sequence, and show it in the breadcrumb trail.
    function mouseover(d) {
      var percentage = (100 * d.value / totalSize).toPrecision(3);
      var percentageString = percentage + "%";
      if (percentage < 0.1) {
        percentageString = "< 0.1%";
      }

      d3.select("#percentage")
        .text(percentageString);

      d3.select("#explanation")
        .style("visibility", "");

      var sequenceArray = getAncestors(d);
      updateBreadcrumbs(sequenceArray, percentageString);

      // Fade all the segments.
      d3.selectAll("path")
        .style("opacity", 0.3);

      // Then highlight only those that are an ancestor of the current segment.
      vis.selectAll("path")
        .filter(function (node) {
          return (sequenceArray.indexOf(node) >= 0);
        })
        .style("opacity", 1);
    }

    // Restore everything to full opacity when moving off the visualization.
    function mouseleave(d) {

      // Hide the breadcrumb trail
      d3.select("#trail")
        .style("visibility", "hidden");

      // Deactivate all segments during transition.
      d3.selectAll("path").on("mouseover", null);

      // Transition each segment to full opacity and then reactivate it.
      d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .on("end", function () {
          d3.select(this).on("mouseover", mouseover);
          d3.select("#percentage").text("");
        });

      d3.select("#explanation")
        .style("visibility", "hidden");
    }

    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    function getAncestors(node) {
      var path = [];
      var current = node;
      while (current.parent) {
        path.unshift(current);
        current = current.parent;
      }
      return path;
    }

    function initializeBreadcrumbTrail() {
      // Add the svg area.
      var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", width)
        .attr("height", 50)
        .attr("id", "trail");
      // Add the label at the end, for the percentage.
      trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#000");
    }

    // Generate a string that describes the points of a breadcrumb polygon.
    function breadcrumbPoints(d, i) {
      var points = [];
      points.push("0,0");
      points.push(b.w + ",0");
      points.push(b.w + b.t + "," + (b.h / 2));
      points.push(b.w + "," + b.h);
      points.push("0," + b.h);
      if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
        points.push(b.t + "," + (b.h / 2));
      }
      return points.join(" ");
    }

    //var context = this;
    // Update the breadcrumb trail to show the current sequence and percentage.
    function updateBreadcrumbs(nodeArray, percentageString) {
      // Data join; key function combines name and depth (= position in sequence).
      var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function (d) {
          return d.data.text.slice(0, 10) + d.depth;
        });

      // Add breadcrumb and label for entering nodes.
      var entering = g.enter().append("g");

      entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function (d) { return colors((d.children ? d : d.parent).data.text.slice(0, 10)); });

      entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.45em")
        .attr("text-anchor", "middle")
        .text(function (d) { return d.data.text.slice(0, 10); });


      // Set position for entering and updating nodes.
      d3.select("#trail")
        .selectAll("g").attr("transform", function (d, i) {
          return "translate(" + (d.depth - 1) * (b.w + b.s) + ", 0)";
        });

      // Remove exiting nodes.
      g.exit().remove();

      // Now move and update the percentage at the end.
      d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.95em")
        .attr("text-anchor", "middle")
        .text(percentageString);

      // Make the breadcrumb trail visible, if it's hidden.
      d3.select("#trail")
        .style("visibility", "");

    }

    function drawLegend(json) {

      // Dimensions of legend item: width, height, spacing, radius of rounded rect.
      var li = {
        w: 250, h: 30, s: 3, r: 3
      };

      var legend = d3.select("#legend").append("svg:svg")
        .attr("width", li.w)
        .attr("height", d3.keys(colors).length * (li.h + li.s));

      var g = legend.selectAll("g")
        .data(d3.entries(colors))
        .enter().append("svg:g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * (li.h + li.s) + ")";
        });

      var root = d3.hierarchy(json);
      root.sum(function (d) { return d.timestamp; });

      var nodes = partition(root).descendants()

      g.append("svg:rect")
        .data(nodes)
        .attr("rx", li.r)
        .attr("ry", li.r)
        .attr("width", li.w)
        .attr("height", li.h)
        .style("fill", function (d) {
          return colors((d.children ? d : d.parent).data.text.slice(0, 10));
        })

      g.append("svg:text")
        .data(nodes)
        .attr("x", li.w / 2)
        .attr("y", li.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d) { return d.data.text; });
    }

    function toggleLegend() {
      var legend = d3.select("#legend");
      if (legend.style("visibility") === "hidden") {
        legend.style("visibility", "");
      } else {
        legend.style("visibility", "hidden");
      }
    }
  }


  //   <div>
  //   <div id="main">
  //     <div id="sequence" />
  //     <div id="chart">
  //       <div id="explanation" style={{ visibility: "hidden" }}>
  //         <span id="percentage"></span><br />
  //       </div>
  //     </div>
  //     <div id="sidebar">
  //       <input type="checkbox" id="togglelegend" /> Legend<br />
  //       <div id="legend" style={{ visibility: "hidden" }} />
  //     </div>
  //   </div>
  // </div>
  render() {
    return (
      <div>
        <div id="main">
          <div id="sequence"></div>
          <div id="chart">
          </div>
        </div>
        <div id="sidebar">
          <input type="checkbox" id="togglelegend" /> Legend<br />
          <div id="legend" style={{ visibility: "hidden" }}></div>
        </div>
      </div>
    )
  }
}

export default SequenceSunBurst;