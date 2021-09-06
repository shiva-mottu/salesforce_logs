import React, { useState, useEffect } from 'react';
import * as d3 from 'd3'
import Tree from 'react-d3-tree';
import "./StyleSheets/tree.css"

// const orgChart = {
//   name: 'CEO',
//   children: [
//     {
//       name: 'Manager',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Fabrication',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

export default function OrgChartTree() {
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    fetch('refined_data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(root => {
      const result = removeDuplicates(root);
      setTreeData(result)
      console.log(result)
      generateTree(result)
    })
  }, [])

  function removeDuplicates(parentNode) {
    const childObj = {};
    for (let i = parentNode.children.length - 1; i >= 0; i--) {
      const child = parentNode.children[i];
      if (child.children.length === 0 && child.text !== undefined) {
        if (!childObj.hasOwnProperty(child.text)) {
          child.recursive = 1;
          childObj[child.text] = child;
          console.log(childObj)
        } else {
          childObj[child.text].recursive += 1;
          childObj[child.text].duration += child.duration;
          childObj[child.text].netDuration += child.netDuration;
          childObj[child.text].timestamp = child.timestamp;
          if (i === 0) {
            child.timestamp = childObj[child.text].timestamp;
            child.duration = childObj[child.text].duration;
            child.netDuration = childObj[child.text].netDuration;
            child.recursive = childObj[child.text].recursive;
          } else {
            parentNode.children.splice(i, 1);
          }

        }
      } else {
        removeDuplicates(child);
      }
    }
    return parentNode
  }

  function generateTree(data) {
    let width = 1800;
    const tree = data => {
      const root = d3.hierarchy(data);
      root.dx = 15;
      root.dy = width / (root.height + 1);
      return d3.tree().nodeSize([root.dx, root.dy])(root);
    }

    const root = tree(data);

    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });


    let svg = d3.select('#chart')
      .append('svg')
      .attr("viewBox", [0, 0, width, width])
      .style("font", "10px sans-serif");

    const g = svg.append("g")
      .attr("class", "tree")
      .attr("font-family", "sans-serif")
      .attr("font-size", 13)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name.slice(0, 10))
      .clone(true).lower()
      .attr("stroke", "white");
  }

  // return (
  //   <div id="treeWrapper" style={{ width: '80em', height: '50em' }}>
  //     { Object.keys(treeData).length > 0 &&
  //       <Tree data={treeData} />
  //     }
  //   </div>
  // );

  return (
    <div>
      <div id="main">
        <div id="chart"></div>
      </div>
    </div>
  )
}