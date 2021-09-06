import React, { Component } from 'react';
import * as d3 from 'd3'
import "./StyleSheets/radialTree.css"

class RadialTree extends Component {
  constructor() {
    super();
    this.createRadialTree = this.createRadialTree.bind(this);
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
      this.createRadialTree(root)
    })
  }

  createRadialTree(tidyInfo) {
    let width = 954;
    let radius = width / 2;

    let data = d3.hierarchy(tidyInfo)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name))


    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)

    const root = tree(data);

    let svg = d3.select('#chart')
      .append('svg')
      .attr("viewBox", [0, 0, width, width])
      .style("font", "10px sans-serif");
    // .attr('width', width)
    // .attr('height', height)


    svg.append("g")
      .attr("class", "radial")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

    svg.append("g")
      .attr("class", "radial")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

    svg.append("g")
      .attr("class", "radial")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0) 
        rotate(${d.x >= Math.PI ? 180 : 0})
      `)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .text(d => d.data.name.slice(0, 10))
      .clone(true).lower()
      .attr("stroke", "white");

  }

  render() {
    return (
      <div>
        <div id="chart" />
      </div>
    )
  }
}

export default RadialTree;