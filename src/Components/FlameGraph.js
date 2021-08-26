import React, { useState, useEffect } from "react";
import { FlameGraph } from 'react-flame-graph';
import ReactTooltip from "react-tooltip";

export default function FlameGraphComponent(props) {
    const [data, setData] = useState({})
    useEffect(() => {
        console.log("prps", props)
        fetch('data.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(root => {
            function getRandomColor(exists) {
                var letters = '0123456789ABCDEF';
                var color = '#';
                if (exists) {
                    color += "FF0000"
                } else {
                    for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }

                    if (color === "#FF0000") {
                        color = "#DC143C"
                    }
                }
                return color;
            }

            function recursive(data, json) {
                if (json.children.length === 0) return data
                let data_ = {
                    name: json.text,
                    value: Math.round(json.duration / 1000000),
                    backgroundColor: getRandomColor("error" in json),
                    color: '#fff',
                    children: []
                }
                let noChilds = json.children.filter(o => o.children.length === 0)
                noChilds.map(o => {
                    data_.children.push({
                        name: o.text,
                        value: Math.round(o.duration / 1000000),
                        backgroundColor: getRandomColor("error" in o),
                        color: '#fff',
                        children: []
                    })
                })
                json.children.filter(o => o.children.length !== 0).forEach(element => {
                    data_.children.push(
                        recursive(data, element)
                    )
                });
                return data_
            }

            let data = recursive({}, root)
            console.log(data)
            setData(data)
        })
        // setData(props)
    }, [props])

    return (
        <div>
            {
                Object.keys(data).length > 0 &&
                <FlameGraph
                    data={data}
                    height={props.height ? props.height : 550}
                    width={props.width ? props.width : 1850}
                    onChange={node => {
                        console.log(`"${node.name}" focused`);
                    }}
                />

                // <FlameGraph
                //     data={data}
                //     height={props.height ? props.height : 500}
                //     width={props.width ? props.width : 1000}
                //     disableDefaultTooltips={true}
                //     onMouseOver={(event, itemData) => (
                //         // event is the React event
                //         <>
                //             <a data-tip="React-tooltip"> ◕‿‿◕ </a>
                //             <ReactTooltip place="top" type="dark" effect="float" />
                //         </>
                //         // itemData belongs to the hovered flamegraph node;
                //         // it is a node of the larger "data" object passed to FlameGraph.
                //     )}
                //     onMouseOut={(event, itemData) => {
                //         // ...
                //     }}
                //     onMouseMove={(event, itemData) => {
                //         // ...
                //     }}
                // />
            }
        </div>
    )
}
