import React, { useState, useEffect } from "react";
import { FlameGraph } from 'react-flame-graph';
import { Container, Row, Col, Button } from 'reactstrap';

const colors = {
    method: "#007AFF",
    custom: "#00238E",
    flow_start_interviews: "#8495ed",
    validation: "#283c5f",
    soql: "#0862c5",
    dml: "#9ec6f3",
    error: "#ff0000",
    others: ["#004999", "", "", ""]
};
export default function FlameGraphComponent(props) {
    const [data, setData] = useState({})
    const [errMsg, setErrMsg] = useState([]);
    const [grpColors, setGrpColors] = useState({});
    const [ctpColors, setCtpColors] = useState({});

    useEffect(() => {
        // function getRandomColor() {
        //     var letters = '0123456789ABCDEF';
        //     var color = '#';
        //     for (var i = 0; i < 6; i++) {
        //         color += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return color;
        // }

        function getRandomColor() {
            //skip green
            var ranges = [[60, 300]];

            //get max random
            var total = 0, i;
            for (i = 0; i < ranges.length; i += 1) {
                total += ranges[i][1] - ranges[i][0] + 1;
            }

            //get random hue index
            var randomHue = Math.floor(Math.random() * total);

            //convert index to actual hue
            var pos = 0;
            for (i = 0; i < ranges.length; i += 1) {
                pos = ranges[i][0];
                if (randomHue + pos <= ranges[i][1]) {
                    randomHue += pos;
                    break;
                } else {
                    randomHue -= (ranges[i][1] - ranges[i][0] + 1);
                }
            }

            return 'hsl(' + randomHue + ',100%,50%)';
        }

        function getColor(colors, json) {
            let color = "";

            if ("cpuType" in json) {
                let type = json.cpuType.toLowerCase();
                color = colors[type]
            }

            if ("group" in json) {
                let group = json.group.toLowerCase();
                color = colors[group]
            }

            if (color === "") {
                color = colors.others[0]
            }

            if ("error" in json) {
                color = "#FF0000"
            }

            return color;
        }

        let groupColors = {};
        let cpuTypeColors = {};
        function recursive(data, json) {

            // if ("cpuType" in json) {
            //     if (!(json.cpuType in cpuTypeColors)) {
            //         let color = getRandomColor();
            //         cpuTypeColors[json.cpuType] = color;
            //     }
            // }

            // if ("group" in json) {
            //     if (!(json.group in groupColors)) {
            //         let color = getRandomColor();
            //         groupColors[json.group] = color;
            //     }
            // }

            let processName = "Process Name: " + json.name + "\nDuration : " + (((json.duration / 1000000) % 60000) / 1000).toFixed(2) + " sec";
            let data_ = {
                name: processName,
                value: Math.round(json.duration / 1000000),
                backgroundColor: getColor(colors, json),
                color: '#fff',
                tooltip: ("error" in json) ? processName + "\nError : " + json.error : processName,
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

            setGrpColors(groupColors)
            setCtpColors(cpuTypeColors)
            if ("error" in props.data) {
                setErrMsg(props.data.error.split("|"))
            }

        }

    }, [props])

    return (
        <Container>
            {
                Object.keys(data).length > 0 &&
                <Row>
                    <FlameGraph
                        data={data}
                        height={props.height ? props.height : 350}
                        width={props.width ? props.width : 1850}
                    // onChange={node => {
                    //     console.log(`"${node.name}" focused`);
                    // }}
                    />
                </Row>
            }
            <Row>
                <Col>
                    <div>
                        {Object.keys(colors).map(name => {
                            if (name !== "others") {
                                return <Button style={{ background: colors[name], color: "white", padding: "5px", marginLeft: "5px" }}>{name.toUpperCase()}</Button>
                            }
                        })}
                    </div>

                </Col>
                <Col>
                    <div style={{ background: "red", borderRadius: "5px", color: "white", padding: "25px 50px 75px" }}>
                        <h3>Error Messages</h3>
                        {errMsg.map(text => (
                            <>
                                <span >{text}</span> <br />
                            </>
                        )
                        )}
                    </div>
                </Col>
            </Row>
        </Container >
        // <div>
        //     {
        //         Object.keys(data).length > 0 &&
        //         <div>
        //             <FlameGraph
        //                 data={data}
        //                 height={props.height ? props.height : 350}
        //                 width={props.width ? props.width : 1850}
        //             />
        //             <div>
        //                 <div><h6 style={{ color: "red" }}>Error Messages</h6></div>
        //                 {errMsg.map(text => (
        //                     <div><h6 style={{ color: "red" }}>{text}</h6></div>
        //                 )
        //                 )}
        //             </div>
        //         </div>
        //     }
        // </div>
    )
}
