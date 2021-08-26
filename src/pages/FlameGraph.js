import React, { useEffect, useState } from 'react';
import FlameGraphComponent from "../Components/FlameGraph"
export default function FlameGraph(props) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch('data.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(root => {
            const groupByKeys = (data, key) => {
                return Object.values(data.reduce((result, obj) => {
                    let objKey = obj[key]
                    result[objKey] = result[objKey] || { key: key, count: 0, value: objKey };
                    result[objKey].count += 1;
                    return result
                }, {}))
            }
            function recursive(data, json) {
                if (json.children.length === 0) return data
                let data_ = {
                    name: json.text,
                    children: []
                }
                let noChilds = json.children.filter(o => o.children.length === 0)
                let grouped = groupByKeys(noChilds, 'name')
                grouped.map(o => {
                    if (o.count > 1) data_.children.push({ name: o.value + ' (' + o.count + ')', children: [] })
                    else data_.children.push({ name: o.value, children: [] })
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
            //setData(root)
        })
    }, [props])
    return (
        <FlameGraphComponent data={data} height={1500} width={2500} />
    )
}
