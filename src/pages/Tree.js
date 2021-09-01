import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import "./StyleSheets/tree.css"

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

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

  return (
    <div id="treeWrapper" style={{ width: '80em', height: '50em' }}>
      { Object.keys(treeData).length > 0 &&
        <Tree data={treeData} style={{ height: '2500px' }} />
      }
    </div>
  );
}