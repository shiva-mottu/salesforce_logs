import React, { useState, useEffect } from "react";
import { FlameGraph } from 'react-flame-graph';
import ReactTooltip from "react-tooltip";

export default function FlameGraphComponent(props) {
    const [data, setData] = useState({})
    useEffect(() => {
        console.log(props)
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getColor(groupColors, cpuTypeColors, json) {
            let color = "";

            if ("cpuType" in json) {
                let type = json.cpuType;
                color = cpuTypeColors[type]
            }

            if ("group" in json) {
                let group = json.group;
                color = groupColors[group]
            }

            if ("error" in json) {
                color = "#FF0000"
            }

            return color;
        }

        let groupColors = {};
        let cpuTypeColors = {};
        function recursive(data, json) {

            if ("cpuType" in json) {
                if (!(json.cpuType in cpuTypeColors)) {
                    let color = getRandomColor();
                    cpuTypeColors[json.cpuType] = color;
                }
            }

            if ("group" in json) {
                if (!(json.group in groupColors)) {
                    let color = getRandomColor();
                    groupColors[json.group] = color;
                }
            }

            console.log(groupColors)
            console.log(cpuTypeColors)

            let data_ = {
                name: json.text + "--" + (((json.duration / 1000000) % 60000) / 1000).toFixed(2) + " sec",
                value: Math.round(json.duration / 1000000),
                backgroundColor: getColor(groupColors, cpuTypeColors, json),
                color: '#fff',
                //tooltip: json.text + "--" + (((json.duration / 1000000) % 60000) / 1000).toFixed(2) + " sec",
                children: []
            }
            json.children.forEach((element, index) => {
                if (index == 0) {
                    if (element.timestamp - json.timestamp > 0) {
                        data_.children.push({
                            name: "",
                            value: Math.round((element.timestamp - json.timestamp) / 1000000),
                            backgroundColor: "#fff",
                            color: '#fff',
                            children: []
                        })
                    }
                }
                else if (index == json.children.length - 1) {
                    if (json.exitStamp - element.exitStamp > 0) {
                        data_.children.push({
                            name: "",
                            value: Math.round((json.exitStamp - element.exitStamp) / 1000000),
                            backgroundColor: "#fff",
                            color: '#fff',
                            children: []
                        })
                    }
                }
                else if (index > 0 && index < json.children.length - 1) {
                    if (json.children[index - 1].exitStamp - element.timestamp > 0) {
                        data_.children.push({
                            name: "",
                            value: Math.round((json.children[index - 1].exitStamp - element.timestamp) / 1000000),
                            backgroundColor: "#fff",
                            color: '#fff',
                            children: []
                        })
                    }
                }

                data_.children.push(
                    recursive(data, element)
                )
            });

            return data_
        }

        if (Object.keys(props.data).length > 0) {
            let data = recursive({}, props.data)
            setData(data)
        }

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
            }
        </div>
    )
}
