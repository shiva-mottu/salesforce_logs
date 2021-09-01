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
            setData(root)
        })
    }, [props])
    return (
        <FlameGraphComponent data={data} height={300} width={1900} />
    )
}
