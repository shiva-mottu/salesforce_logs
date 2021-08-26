import React, { Component } from 'react';
import * as d3 from 'd3'

class RadialTree extends Component {
  constructor() {
    super();

    this.createRadialTree = this.createRadialTree.bind(this);
    //this.autoBox = this.autoBox.bind(this);
  }

  componentDidMount() {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(root => {

      // const groupByKeys = (data, key) => {
      //   return Object.values(data.reduce((result, obj) => {
      //     let objKey = obj[key]
      //     result[objKey] = result[objKey] || { key: key, count: 0, value: objKey };
      //     result[objKey].count += 1;
      //     return result
      //   }, {}))
      // }


      // function recursive(data, json) {
      //   if (json.children.length === 0) return data
      //   let data_ = {
      //     name: json.text,
      //     children: []
      //   }
      //   let noChilds = json.children.filter(o => o.children.length === 0)
      //   let grouped = groupByKeys(noChilds, 'name')
      //   grouped.map(o => {
      //     if (o.count > 1) data_.children.push({ name: o.value + ' (' + o.count + ')', children: [] })
      //     else data_.children.push({ name: o.value, children: [] })
      //   })
      //   json.children.filter(o => o.children.length !== 0).forEach(element => {
      //     data_.children.push(
      //       recursive(data, element)
      //     )
      //   });
      //   return data_
      // }

      // console.log(root)
      //let data = recursive({}, root)

      function recursiveData(data, json, parentName) {
        if (json.children.length === 0) return data

        let name = ""
        if (parentName != "") {
          if (json.text.includes("(")) {
            name = parentName + "-" + json.text.split("(")[0]
          } else {
            name = parentName + "-" + json.text
          }
        } else {
          if (json.text.includes("(")) {
            name = json.text.split("(")[0]
          } else {
            name = json.text
          }
        }
        parentName = name

        let data_ = {
          id: name,
          value: json.duration
        }
        data.push(data_)

        let noChilds = json.children.filter(o => o.children.length === 0)
        noChilds.map(o => {
          let lstChildName = "";
          if (o.text.includes("(")) {
            lstChildName = parentName + "-" + o.text.split("(")[0]
          } else {
            lstChildName = o.text
          }
          let obj = {
            id: lstChildName,
            value: o.duration
          }
          data.push(obj)
        })

        json.children.filter(o => o.children.length !== 0).forEach(element => {
          recursiveData(data, element, parentName)
        });

        return data
      }

      let data = recursiveData([], root, "")
      console.log(data)

      // this.createRadialTree(data)

      this.createRadialTree(data)
    })
  }

  createRadialTree(data1) {
    let data = [
      { 'id': 'Most Reviewed Yelp Restaurants' },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-burger',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-fries',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-cheese',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-ordered',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-steak',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-good',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-chicken',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-delicious',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-beef',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-sweet',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-amazing',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-bacon',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-sauce',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-cream',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 0-came',
        'value': 5
      },
      { 'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1', 'value': 5 },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-place',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-food',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-good',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-vegas',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-great',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-just',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-time',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-like',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-love',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-really',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-best',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-wait',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-sandwich',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-service',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 1-delicious',
        'value': 5
      },
      { 'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2', 'value': 5 },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-buffet',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-food',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-vegas',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-best',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-good',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-great',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-worth',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-wait',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-buffets',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-time',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-burger',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-place',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-quality',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-ive',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 2-went',
        'value': 5
      },
      { 'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3', 'value': 5 },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-crab',
        'value': 5,
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-like',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-rib',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-shrimp',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-ramen',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-sushi',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-buffet',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-dishes',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-dessert',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-thai',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-prime',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-seafood',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-food',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-fresh',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 3-good',
        'value': 5
      },
      { 'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4', 'value': 5 },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-pizza',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-bouchon',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-secret',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-crust',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-mon',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-ami',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-gabi',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-floor',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-white',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-bobby',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-bianco',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-hallway',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-flay',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-thomas',
        'value': 5
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-5 Star Reviews-Topic 4-pizzeria',
        'value': 5
      },
      { 'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews', 'value': 1 },
      { 'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0', 'value': 1 },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-buffet',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-crab',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-buffets',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-sushi',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-legs',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-food',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-rib',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-seafood',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-selection',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-prime',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-good',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-wynn',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-dessert',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-shrimp',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 0-station',
        'value': 1
      },
      { 'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1', 'value': 1 },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-burger',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-good',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-ordered',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-like',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-just',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-food',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-fries',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-chicken',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-hot',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-chocolate',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-really',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-place',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-got',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-came',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 1-didnt',
        'value': 1
      },
      { 'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2', 'value': 1 },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-island',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-ellis',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-dogs',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-yea',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-earl',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-tourists',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-neon',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-karaoke',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-episode',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-serendipity',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-fez',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-pack',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-duke',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-chutney',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 2-chantrelles',
        'value': 1
      },
      { 'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3', 'value': 1 },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-minutes',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-table',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-service',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-food',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-time',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-order',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-asked',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-server',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-came',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-told',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-restaurant',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-seated',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-took',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-said',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 3-wait',
        'value': 1
      },
      { 'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4', 'value': 1 },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-food',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-place',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-good',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-just',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-like',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-dont',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-vegas',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-time',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-really',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-wait',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-line',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-service',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-better',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-im',
        'value': 1
      },
      {
        'id': 'Most Reviewed Yelp Restaurants-1 Star Reviews-Topic 4-people',
        'value': 1
      }];

    let height = 1000;
    let width = 1000;

    let svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    let g = svg.append("g").attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");
    // let svg = d3.select("svg"),
    //   width = +svg.attr("width"),
    //   height = +svg.attr("height"),
    //   g = svg.append("g").attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");

    let stratify = d3.stratify()
      .parentId(function (d) { return d.id.substring(0, d.id.lastIndexOf("-")); });

    let tree = d3.cluster()
      .size([360, 390])
      .separation(function (a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

    let root = tree(stratify(data)
      .sort(function (a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));

    let link = g.selectAll(".link")
      .data(root.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", function (d) {
        return "M" + project(d.x, d.y)
          + "C" + project(d.x, (d.y + d.parent.y) / 2)
          + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
          + " " + project(d.parent.x, d.parent.y);
      });

    let node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function (d) { return "translate(" + project(d.x, d.y) + ")"; });

    node.append("circle")
      .attr("r", 2.5)
      .attr("fill", function (d) {
        let color = '';
        if (d.data.value == 5) {
          color = "blue"
        } else if (d.data.value == 1) {
          color = "red"
        }
        return color
      });

    node.append("text")
      .attr("dy", ".31em")
      .attr("x", function (d) { return d.x < 180 === !d.children ? 6 : -6; })
      .style("text-anchor", function (d) { return d.x < 180 === !d.children ? "start" : "end"; })
      .attr("transform", function (d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
      .text(function (d) { return d.id.substring(d.id.lastIndexOf("-") + 1); });

    function project(x, y) {
      let angle = (x - 90) / 180 * Math.PI, radius = y;
      return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }
  }
  // autoBox() {
  //   document.body.appendChild(this);
  //   const { x, y, width, height } = this.getBBox();
  //   document.body.removeChild(this);
  //   return [x, y, width, height];
  // }

  // createRadialTree(input) {
  //   let height = 1000;
  //   let width = 1000;

  //   let svg = d3.select('#chart')
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height);

  //   let diameter = height * 0.35;
  //   let radius = diameter / 0.90;

  //   let tree = d3.tree()
  //     .size([2 * Math.PI, radius])
  //     .separation(function (a, b) { return (a.parent === b.parent ? 1 : 2) / a.depth; });
  //   //.separation(function (a, b) { return (a.parent === b.parent ? 10 : 17) });

  //   let data = d3.hierarchy(input)

  //   let treeData = tree(data);

  //   let nodes = treeData.descendants();
  //   let links = treeData.links();

  //   let graphGroup = svg.append('g')
  //     .attr('transform', "translate(" + (width / 2) + "," + (height / 2) + ")");

  //   graphGroup.selectAll(".link")
  //     .data(links)
  //     //.join("path")
  //     .enter().append('path')
  //     .attr("class", "link")
  //     .attr("d", d3.linkRadial()
  //       .angle(d => d.x)
  //       .radius(d => d.y));

  //   let node = graphGroup
  //     .selectAll(".node")
  //     .data(nodes)
  //     //.join("g")
  //     .enter().append('g')
  //     .attr("class", "node")
  //     .attr("transform", function (d) {
  //       return `rotate(${d.x * 180 / Math.PI - 90})` + `translate(${d.y}, 0)`;
  //     });


  //   node.append("circle").attr("r", 1);

  //   node.append("text")
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", 9)
  //     .attr("dx", function (d) { return d.x < Math.PI ? 8 : -8; })
  //     .attr("dy", ".31em")
  //     .attr("text-anchor", function (d) { return d.x < Math.PI ? "start" : "end"; })
  //     .attr("transform", function (d) { return d.x < Math.PI ? null : "rotate(180)"; })
  //     .text(function (d) { return d.data.name; });
  // }

  render() {
    return (
      <div>
        <div id="main">
          <div id="chart"></div>
        </div>
      </div>
    )
  }
}

export default RadialTree;