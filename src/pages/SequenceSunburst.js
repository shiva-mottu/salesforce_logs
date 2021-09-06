import React, { Component } from 'react';
import * as d3 from 'd3'
import "./StyleSheets/sequenceSunburst.css"

class SequenceSunBurst extends Component {

  constructor() {
    super();
    this.createVisualization = this.createVisualization.bind(this);
  }
  componentDidMount() {
    fetch('refined_data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(root => {
      this.createVisualization(root)
    })
  }


  // Main function to draw and set up the visualization, once we have the data.
  createVisualization(data) {
    let width = 640;
    let radius = width / 2;

    const partition = data =>
      d3.partition().size([2 * Math.PI, radius * radius])(
        d3
          .hierarchy(data)
          .sum(d => d.duration)
          .sort((a, b) => b.duration - a.duration)
      )

    const mousearc = d3
      .arc()
      .startAngle(d => { console.log(d); return d.x0 })
      .endAngle(d => d.x1)
      .innerRadius(d => Math.sqrt(d.y0))
      .outerRadius(radius)

    const arc = d3
      .arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(1 / radius)
      .padRadius(radius)
      .innerRadius(d => Math.sqrt(d.y0))
      .outerRadius(d => Math.sqrt(d.y1) - 1)

    const color = d3
      .scaleOrdinal()
      .domain(["method", "custom", "flow_start_interviews", "validation", "soql", "dml"])
      .range(["#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb"])

    const root = partition(data);

    let svg = d3.select('#sequenceChart')
      .append('svg')
      .attr("viewBox", [0, 0, width, width])
      .style("font", "10px sans-serif");

    // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
    const element = svg.node();
    element.value = { sequence: [], percentage: 0.0 };

    const label = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#888")
      .style("visibility", "hidden");

    label
      .append("tspan")
      .attr("class", "percentage")
      .attr("x", 0)
      .attr("y", 0)
      .attr("dy", "-0.1em")
      .attr("font-size", "3em")
      .text("");

    label
      .append("tspan")
      .attr("x", 0)
      .attr("y", 0)
      .attr("dy", "1.5em")
      .text("Name:");

    svg
      .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
      .style("max-width", `${width}px`)
      .style("font", "12px sans-serif");

    const path = svg
      .append("g")
      .selectAll("path")
      .data(
        root.descendants().filter(d => {
          // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
          return d.depth && d.x1 - d.x0 > 0.001;
        })
      )
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc);

    svg
      .append("g")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mouseleave", () => {
        path.attr("fill-opacity", 1);
        label.style("visibility", "hidden");
        // Update the value of this view
        element.value = { sequence: [], percentage: 0.0 };
        element.dispatchEvent(new CustomEvent("input"));
      })
      .selectAll("path")
      .data(
        root.descendants().filter(d => {
          // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
          return d.depth && d.x1 - d.x0 > 0.001;
        })
      )
      .join("path")
      .attr("d", mousearc)
      .on("mouseenter", (event, d) => {
        // Get the ancestors of the current segment, minus the root
        const sequence = d
          .ancestors()
          .reverse()
          .slice(1);
        // Highlight the ancestors
        path.attr("fill-opacity", node =>
          sequence.indexOf(node) >= 0 ? 1.0 : 0.3
        );
        const percentage = ((100 * d.value) / root.value).toPrecision(3);
        label
          .style("visibility", null)
          .select(".percentage")
          .text(percentage + "%");
        // Update the value of this view with the currently hovered sequence and percentage
        element.value = { sequence, percentage };
        element.dispatchEvent(new CustomEvent("input"));
      });
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
        <div id="sequenceChart" />
      </div>
    )
  }
}

export default SequenceSunBurst;